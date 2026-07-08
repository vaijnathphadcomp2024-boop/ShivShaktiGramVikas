import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import ObjectListAdmin from './ObjectListAdmin';

export default function SafetyCollegeAdmin() {
  return (
    <section>
      <h2 className="text-2xl font-extrabold mb-6 text-navy border-b pb-2">Safety College Dynamic Data</h2>

      <ObjectListAdmin
        title="Courses"
        collectionName="sc_courses"
        fields={[
          { name: 'name', placeholder: 'Course Name (e.g. Diploma in Industrial Safety)', required: true },
          { name: 'code', placeholder: 'Course Code (e.g. DIS)' },
          { name: 'duration', placeholder: 'Duration (e.g. 1 Year)' },
          { name: 'eligibility', placeholder: 'Eligibility' },
          { name: 'seats', placeholder: 'Seats (e.g. 60)' },
          { name: 'mode', placeholder: 'Mode (e.g. Full-time)' },
          { name: 'highlights', placeholder: 'Highlights (comma separated)', type: 'textarea', required: true },
        ]}
        renderItem={(item) => <div><strong>{item.name}</strong> ({item.code}) - {item.duration}</div>}
      />

      <ObjectListAdmin
        title="Faculty"
        collectionName="sc_faculty"
        fields={[
          { name: 'initials', placeholder: 'Initials/Emoji (e.g. Mr. or 👨‍🏫)', required: true },
          { name: 'name', placeholder: 'Faculty Name', required: true },
          { name: 'qual', placeholder: 'Qualifications' },
          { name: 'desig', placeholder: 'Designation', required: true },
          { name: 'exp', placeholder: 'Experience (e.g. 8+ yrs)' },
        ]}
        renderItem={(item) => <div><strong>{item.name}</strong> - {item.desig} <p className="text-sm text-gray-500">{item.qual} | {item.exp}</p></div>}
      />

      <ObjectListAdmin
        title="Placements"
        collectionName="sc_placements"
        fields={[
          { name: 'emoji', placeholder: 'Emoji (e.g. 👷)', required: true, default: '👷' },
          { name: 'name', placeholder: 'Student Name', required: true },
          { name: 'batch', placeholder: 'Batch (e.g. 2024)' },
          { name: 'company', placeholder: 'Company Name', required: true },
          { name: 'role', placeholder: 'Role (e.g. Safety Officer)' },
        ]}
        renderItem={(item) => <div><strong>{item.emoji} {item.name}</strong> ({item.batch}) - Placed at {item.company} as {item.role}</div>}
      />

      <ObjectListAdmin
        title="Admission Steps"
        collectionName="sc_admission_steps"
        fields={[
          { name: 'n', placeholder: 'Step Number (e.g. 01)', required: true },
          { name: 'title', placeholder: 'Step Title', required: true },
          { name: 'desc', placeholder: 'Description', type: 'textarea', required: true },
        ]}
        renderItem={(item) => <div><strong>Step {item.n}: {item.title}</strong> <p className="text-sm text-gray-500">{item.desc}</p></div>}
      />

      <ObjectListAdmin
        title="Hiring Partners (Employers)"
        collectionName="sc_employers"
        fields={[
          { name: 'name', placeholder: 'Company Name', required: true },
        ]}
        renderItem={(item) => <strong>{item.name}</strong>}
      />
    </section>
  );
}
