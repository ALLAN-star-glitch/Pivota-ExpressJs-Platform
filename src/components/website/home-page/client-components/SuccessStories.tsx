"use client";

import { motion } from "framer-motion";

const SuccessStories = () => {
  const stories = [
    {
      name: "John Mwangi",
      role: "Software Engineer",
      location: "Nairobi",
      story: "I landed my dream job within two weeks of signing up. The job listings were very relevant, and I received great offers!",
      avatar: "https://www.example.com/avatar-john.jpg",
    },
    {
      name: "Susan Achieng",
      role: "Electrician",
      location: "Kisumu",
      story: "Thanks to this platform, I've expanded my business and got more clients than I ever expected. It's been a game-changer!",
      avatar: "https://www.example.com/avatar-susan.jpg",
    },
    {
      name: "David Kimani",
      role: "Private Tutor",
      location: "Eldoret",
      story: "I found so many tutoring opportunities here. The platform helped me connect with parents who needed my services, and now I have regular clients.",
      avatar: "https://www.example.com/avatar-david.jpg",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-12 lg:px-20 bg-pivotaLightGray">
      <h2 className="text-4xl font-bold text-pivotaNavy text-center mb-12">Success Stories</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-md text-pivotaNavy p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center mb-6">
              <img
                src={story.avatar}
                alt={story.name}
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <h4 className="font-semibold text-xl">{story.name}</h4>
                <p className="text-sm text-gray-600">{story.role} from {story.location}</p>
              </div>
            </div>
            <p className="text-base">{story.story}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
