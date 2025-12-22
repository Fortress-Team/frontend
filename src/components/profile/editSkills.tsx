import React, { useEffect, useState } from "react";
import { getSkills, addSkill, deleteSkill, type Skill } from "../../lib";
import Loader from "../reuseable/loader";

const EditSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkillName, setNewSkillName] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch skills on mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await getSkills();
        setSkills(res);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleAddSkill = async (e?: React.KeyboardEvent) => {
    if ((!e || e.key === "Enter") && newSkillName.trim()) {
      e?.preventDefault();
      try {
        const res = await addSkill({ title: newSkillName.trim() });
        setSkills([...skills, res]);
        setNewSkillName("");
      } catch (error) {
        console.error("Failed to add skill:", error);
      }
    }
  };

  const handleRemoveSkill = async (id: string) => {
    try {
      await deleteSkill(id);
      setSkills(skills.filter((skill) => skill._id !== id));
    } catch (error) {
      console.error("Failed to delete skill:", error);
    }
  };

  if (loading) return <div><Loader /></div>;

  return (
    <section className="p-8 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-neutral-900 border-b border-neutral-200 pb-4">
        Skills
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Add a skill (Press Enter)
        </label>
        <input
          type="text"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          onKeyDown={handleAddSkill}
          className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="e.g. React, UX Design..."
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.length ? (
          skills.map((skill) => (
            <div
              key={skill._id}
              className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium flex items-center gap-2 text-blue-700"
            >
              {skill.title}
              <button
                onClick={() => handleRemoveSkill(skill._id)}
                className="hover:text-red-600 transition-colors font-bold"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <span className="text-sm text-neutral-400">No skills added yet.</span>
        )}
      </div>
    </section>
  );
};

export default EditSkills;
