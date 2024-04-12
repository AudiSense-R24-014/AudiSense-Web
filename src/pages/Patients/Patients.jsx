import React from "react";
import SidebarCombined from "../../components/SidebarCombined";
import { Edit, Trash } from "lucide-react";

function Patients() {
  const patientsJson = [
    {
      Name: "Emily Johnson",
      Age: 32,
      Gender: "Female",
      BloodPressure: "120/80 mmHg",
      HeartRate: "72 bpm",
      Temperature: "98.6°F",
      Weight: "65 kg",
      Height: "170 cm",
      Diagnosis: "Hypertension",
    },
    {
      Name: "John Smith",
      Age: 45,
      Gender: "Male",
      BloodPressure: "130/85 mmHg",
      HeartRate: "65 bpm",
      Temperature: "98.2°F",
      Weight: "80 kg",
      Height: "180 cm",
      Diagnosis: "Type 2 Diabetes",
    },
    {
      Name: "Sarah Lee",
      Age: 28,
      Gender: "Female",
      BloodPressure: "110/70 mmHg",
      HeartRate: "80 bpm",
      Temperature: "98.9°F",
      Weight: "55 kg",
      Height: "160 cm",
      Diagnosis: "Seasonal Allergies",
    },
    {
      Name: "Michael Chen",
      Age: 60,
      Gender: "Male",
      BloodPressure: "140/90 mmHg",
      HeartRate: "78 bpm",
      Temperature: "98.4°F",
      Weight: "75 kg",
      Height: "175 cm",
      Diagnosis: "Osteoarthritis",
    },
    {
      Name: "Emma Davis",
      Age: 20,
      Gender: "Female",
      BloodPressure: "115/75 mmHg",
      HeartRate: "60 bpm",
      Temperature: "98.0°F",
      Weight: "58 kg",
      Height: "165 cm",
      Diagnosis: "Healthy",
    },
  ];

  const handleEdit = (patient) => {
    // Implement your edit logic here
    console.log("Edit", patient);
  };

  const handleDelete = (patient) => {
    // Implement your delete logic here
    console.log("Delete", patient);
  };

  return (
    <div className="flex">
      <SidebarCombined
        props={{ status: "patients" }}
        className="fixed h-full"
      />
      <div className="flex-1 p-10 overflow-x-auto">
        <h1 className="text-4xl font-nunito font-bold mb-8">Patients</h1>
        <div className="min-w-full overflow-hidden overflow-x-scroll">
          <table className="w-full table-auto">
            <thead>
              <tr className=" text-purple-600 font-nunito">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Blood Pressure</th>
                <th className="px-4 py-2">Heart Rate</th>
                <th className="px-4 py-2">Temperature</th>
                <th className="px-4 py-2">Weight</th>
                <th className="px-4 py-2">Height</th>
                <th className="px-4 py-2">Diagnosis</th>
                <th className="px-4 py-2">Edit</th>
                <th className="px-4 py-2">Delete</th>{" "}
                {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {patientsJson.map((patient, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-purple-200 font-nunito"
                      : "bg-purple-300 font-nunito"
                  }
                >
                  <td className="border px-4 py-2">{patient.Name}</td>
                  <td className="border px-4 py-2">{patient.Age}</td>
                  <td className="border px-4 py-2">{patient.Gender}</td>
                  <td className="border px-4 py-2">{patient.BloodPressure}</td>
                  <td className="border px-4 py-2">{patient.HeartRate}</td>
                  <td className="border px-4 py-2">{patient.Temperature}</td>
                  <td className="border px-4 py-2">{patient.Weight}</td>
                  <td className="border px-4 py-2">{patient.Height}</td>
                  <td className="border px-4 py-2">{patient.Diagnosis}</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleEdit(patient)}
                      >
                        <Edit size={20} />
                      </button>
                    </div>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(patient)}
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Patients;
