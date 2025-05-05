import { createCourse } from '@/actions/course.action';
import React from 'react'

const categories = [
  "JavaScript",
  "Python",
  "Java",
  "React",
  "Node.js",
  "Django",
  "TypeScript",
  "C#",
  "Angular",
  "Flutter",
  "Ruby on Rails",
  "Go"
];


const CreateCourse = () => {
  return (<>
      <div className="max-w-xl mx-auto w-[80%] mt-12 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-800">Create New Course</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Fill in the form below to add your course content.
        </p>
      </div>

      <form className="space-y-6" action={createCourse} >
        <div>
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input

            name='title'
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:black focus:border-black"
            placeholder="e.g. Introduction to Web Development"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <select
          name='category'
            className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm bg-white focus:outline-none focus:ring-2 focus:black focus:border-black"
            required
          >
            <option value="" disabled selected>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-black hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Create Course
        </button>
      </form>
    </div>
    </>
  )
}

export default CreateCourse;
