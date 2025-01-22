import React, { useState } from "react";

const Nabar = () => {
  const [activeTab, setActiveTab] = useState("Student");

  const tabs = [
    { name: "Student", href: "/auth/student/login" },
    { name: "Coordinator", href: "/auth/recruiter/login" },
    { name: "Advisor", href: "/auth/coordinator/login" },
    { name: "Alumni", href: "/auth/verifier/login" },
  ];

  return (
    <div className="relative">
      <div className="flex space-x-4 border-b-2">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-2 ${
              activeTab === tab.name
                ? "text-blue-600 border-blue-600 border-b-2"
                : "text-gray-500"
            }`}
          >
            {tab.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Nabar;