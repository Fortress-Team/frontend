// import React from 'react'

import { Loader2, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { addEducation, deleteEducation, getEducations, type Education } from "../../lib"
import { toast } from "sonner"
import Loader from "../reuseable/loader"
import type { AxiosError } from "axios"

const EditEducation = () => {

    const [isSubmitting, setIsSubmitting] = useState<{ type: 'experience' | 'project' | 'education' | null }>({ type: null })
   const [educations, setEducations] = useState<Education[]>([])
    const [isAddingEducation, setIsAddingEducation] = useState(false)
    const [newEducation, setNewEducation] = useState({
        course: '',
        school: '',
        date: ''
    })
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchSkills = async () => {
          try {
            const res = await getEducations();
            setEducations(res);
          } catch (error) {
            console.error("Failed to fetch skills:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchSkills();
      }, []);

      const handleAddEducation = async () => {
            if (newEducation.course && newEducation.school) {
                setIsSubmitting({ type: 'education' })
                try {
                    const res = await addEducation(newEducation)
                    setEducations([...educations, res])
                    setNewEducation({ course: '', school: '', date: '' })
                    setIsAddingEducation(false)
                    toast.success("Education added!")
       } catch (error) {
  const err = error as AxiosError<{ message: string }>; 
  const status = err.response?.status;
  const message = err.response?.data?.message || err.message;

  if (status === 401) toast.error("401 Unauthorized");
  else if (err.code === "ERR_NETWORK") toast.error("CORS Error");
  else toast.error(`Error: ${message}`);
} finally {
  setIsSubmitting({ type: null });
}
            }
        }
    
        const handleRemoveEducation = async (id: string) => {
            try {
                await deleteEducation(id)
                setEducations(educations.filter(edu => edu._id !== id))
            } catch (error) {
                console.error("Failed to delete education:", error)
            }
        }

          if (loading) return <div><Loader /></div>;

  return (
 
                    <section className="p-8 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6 border-b border-neutral-200 pb-4">
                            <h2 className="text-xl font-bold text-neutral-900">Education</h2>
                            <button
                                onClick={() => setIsAddingEducation(!isAddingEducation)}
                                className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
                            >
                                <Plus size={20} /> Add Education
                            </button>
                        </div>

                        {isAddingEducation && (
                            <div className="mb-8 p-6 rounded-xl bg-blue-50/50 border-2 border-blue-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Degree / Course</label>
                                    <input
                                        type="text"
                                        value={newEducation.course}
                                        onChange={(e) => setNewEducation({ ...newEducation, course: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                        placeholder="e.g. Bachelor of Computer Science"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">School / University</label>
                                    <input
                                        type="text"
                                        value={newEducation.school}
                                        onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                        placeholder="e.g. Stanford University"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Date / Year</label>
                                    <input
                                        type="text"
                                        value={newEducation.date}
                                        onChange={(e) => setNewEducation({ ...newEducation, date: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                        placeholder="e.g. 2018 - 2022"
                                    />
                                </div>
                                <div className="md:col-span-2 flex gap-3 mt-2">
                                    <button
                                        onClick={handleAddEducation}
                                        disabled={isSubmitting.type === 'education'}
                                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting.type === 'education' && <Loader2 size={18} className="animate-spin" />}
                                        {isSubmitting.type === 'education' ? 'Saving...' : 'Save Education'}
                                    </button>
                                    <button
                                        onClick={() => setIsAddingEducation(false)}
                                        className="px-6 py-2 bg-white text-neutral-600 font-bold rounded-lg border-2 border-neutral-200 hover:bg-neutral-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {educations.map((edu) => (
                                <div key={edu._id} className="p-6 rounded-xl border-2 border-neutral-200 bg-white hover:border-neutral-300 transition-colors group relative">
                                    <button
                                        onClick={() => handleRemoveEducation(edu._id)}
                                        className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-red-600 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all bg-white rounded-full shadow-sm border border-neutral-200"
                                        title="Remove Education"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-neutral-900">{edu.course}</h3>
                                            <p className="font-medium text-neutral-700">{edu.school}</p>
                                        </div>
                                        <span className="text-sm font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-lg border border-neutral-200">
                                            {edu.date}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {educations.length === 0 && !isAddingEducation && (
                                <p className="text-center text-neutral-400 py-8 italic">No education info added yet.</p>
                            )}
                        </div>

                    </section>
  )
}

export default EditEducation
