import { createCourse } from '@/actions/course.action';
import React from 'react';

const categories = [
  "JavaScript", "Python", "Java", "React", "Node.js",
  "Django", "TypeScript", "C#", "Angular", "Flutter",
  "Ruby on Rails", "Go"
];

const CreateCourse = () => {
  return (
    <div className="max-w-2xl mx-auto w-[90%] mt-12 p-8 bg-white rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 space-y-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Create New Course</h2>
        <p className="text-sm text-gray-500 mt-2">Fill in the form below to add your course content.</p>
      </div>

      <form className="space-y-6" action={createCourse}>
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
            Course Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            type="text"
            required
            placeholder="e.g. Introduction to Web Development"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
          />
        </div>

        {/* Category Select */}
        <div>
          <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            defaultValue=""
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
