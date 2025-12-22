// import React from 'react'

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { addExperience, deleteExperience, getExperiences, type Experience } from "../../lib"
import { Loader2, Trash2 } from "lucide-react"
import Loader from "../reuseable/loader"
import type { AxiosError } from "axios"

const EditExperience = () => {

const [isSubmitting, setIsSubmitting] = useState<{ type: 'experience' | null }>({ type: null })
    
        const [experiences, setExperiences] = useState<Experience[]>([])
        const [isAddingExperience, setIsAddingExperience] = useState(false)
        const [newExperience, setNewExperience] = useState({
            title: '',
            position: '',
            date: '',
            desc: ''
        })

          const [loading, setLoading] = useState(true);
    

            useEffect(() => {
              const fetchExperiences = async () => {
                try {
                  const res = await getExperiences();
             setExperiences(res);
                } catch (error) {
                  console.error("Failed to fetch experience:", error);
                } finally {
                  setLoading(false);
                }
              };
          
              fetchExperiences();
            }, []);


  const handleAddExperience = async () => {
        if (newExperience.title && newExperience.position) {
            setIsSubmitting({ type: 'experience' })
            try {
                const res = await addExperience({
                    title: newExperience.title,
                    position: newExperience.position,
                    date: newExperience.date || 'Not specified',
                    desc: newExperience.desc || ''
                })
                setExperiences([...experiences, res])
                setNewExperience({ title: '', position: '', date: '', desc: '' })
                setIsAddingExperience(false)
                toast.success("Experience added!")
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

    const handleRemoveExperience = async (id: string) => {
        try {
            await deleteExperience(id)
            setExperiences(experiences.filter(exp => exp._id !== id))
        } catch (error) {
            console.error("Failed to delete experience:", error)
        }
    }

     if (loading) return <div><Loader /></div>;

  return (
    <section className="p-8 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6 border-b border-neutral-200 pb-4">
                            <h2 className="text-xl font-bold text-neutral-900">Experience</h2>
                            <button
                                onClick={() => setIsAddingExperience(!isAddingExperience)}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                            >
                                {isAddingExperience ? 'Cancel' : 'Add Experience'}
                            </button>
                        </div>

                        {isAddingExperience && (
                            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                                <h3 className="font-semibold text-lg mb-4 text-neutral-900">Add New Experience</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Company Name</label>
                                        <input
                                            type="text"
                                            value={newExperience.title}
                                            onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                            placeholder="e.g. Acme Corp"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Role / Job Title</label>
                                        <input
                                            type="text"
                                            value={newExperience.position}
                                            onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                            placeholder="e.g. Senior Developer"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Period</label>
                                        <input
                                            type="text"
                                            value={newExperience.date}
                                            onChange={(e) => setNewExperience({ ...newExperience, date: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                            placeholder="e.g. Jan 2020 - Present"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                                        <textarea
                                            rows={3}
                                            value={newExperience.desc}
                                            onChange={(e) => setNewExperience({ ...newExperience, desc: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none resize-none"
                                            placeholder="Describe your responsibilities and achievements..."
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                                        <button
                                            onClick={() => setIsAddingExperience(false)}
                                            className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAddExperience}
                                            disabled={isSubmitting.type === 'experience'}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting.type === 'experience' && <Loader2 size={16} className="animate-spin" />}
                                            {isSubmitting.type === 'experience' ? 'Adding...' : 'Add Position'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {experiences.map((exp) => (
                                <div key={exp._id} className="p-6 rounded-xl border-2 border-neutral-200 bg-white hover:border-neutral-300 transition-colors group relative">
                                    <button
                                        onClick={() => handleRemoveExperience(exp._id)}
                                        className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-red-600 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all bg-white rounded-full shadow-sm border border-neutral-200"
                                        title="Remove Experience"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg text-neutral-900">{exp.position}</h3>
                                            <p className="font-medium text-neutral-700">{exp.title}</p>
                                        </div>
                                        <span className="text-sm font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-lg border border-neutral-200">
                                            {exp.date}
                                        </span>
                                    </div>
                                    <p className="text-neutral-600 text-sm leading-relaxed">{exp.desc}</p>
                                </div>
                            ))}
                            {experiences.length === 0 && (
                                <div className="text-center py-8 text-neutral-400 bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-200">
                                    No experience added yet.
                                </div>
                            )}
                        </div>

                    </section>
  )
}

export default EditExperience
