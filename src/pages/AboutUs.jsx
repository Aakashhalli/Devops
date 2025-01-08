// import { motion } from "framer-motion";

// const teamMembers = [
//   {
//     id: 1,
//     name: "Akash Halli",
//     email: "02fe22bcs012@kletech.ac.in",
//     linkedin: "https://www.linkedin.com/in/akash-halli-3ab6aa231/",
//     image: "./me.jpeg",
//   },
//   {
//     id: 2,
//     name: "Suhan Jamadar",
//     email: "02fe22bcs048@kletech.ac.in",
//     linkedin:
//       "https://www.linkedin.com/in/suhan-jamadar-525740269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
//     image: "./Suhan.jpeg",
//   },
//   {
//     id: 3,
//     name: "Snigdha Bali",
//     email: "02fe22bcs141@kletech.ac.in",
//     linkedin:
//       "https://www.linkedin.com/in/snigdha-bali-7b7260295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
//     image: "./Snigdha.jpeg",
//   },
//   {
//     id: 4,
//     name: "Vaibhavi Patil",
//     email: "02fe22bcs169@kletech.ac.in",
//     linkedin:
//       "https://www.linkedin.com/in/vaibhavi-patil-71571832b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
//     image: "./Vaibhavi.jpeg",
//   },
// ];

// const AboutUs = () => {
//   return (
//     <div className="p-8 bg-gradient-to-b from-black to-gray-900 text-white min-h-[80vh] flex flex-col items-center">
//       {/* Heading with animation */}
//       <motion.h1
//         className="text-4xl font-extrabold mb-10 text-center text-orange-500"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         Meet Our Team
//       </motion.h1>

//       {/* Team Members Grid */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           hidden: { opacity: 0 },
//           visible: {
//             opacity: 1,
//             transition: {
//               staggerChildren: 0.2, // Delay between animations of child components
//             },
//           },
//         }}
//       >
//         {teamMembers.map((member) => (
//           <motion.div
//             key={member.id}
//             className="bg-[#1a1a1a] hover:bg-[#252525] p-6 rounded-2xl flex flex-col items-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
//             variants={{
//               hidden: { opacity: 0, scale: 0.8 },
//               visible: { opacity: 1, scale: 1 },
//             }}
//           >
//             <img
//               src={member.image}
//               alt={`${member.name}'s profile`}
//               className="w-32 h-32 rounded-full mb-4 shadow-lg"
//             />
//             <h2 className="text-2xl font-bold text-orange-400">
//               {member.name}
//             </h2>
//             <p className="text-sm text-gray-300 mt-2">{member.email}</p>
//             <a
//               href={member.linkedin}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-4 px-4 py-2 bg-orange-500 text-black rounded-full hover:bg-orange-400 hover:text-white transition-all"
//             >
//               LinkedIn Profile
//             </a>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default AboutUs;
import { motion } from "framer-motion";
import SpotlightCard from "../components/SpotlightCard.jsx"; // Import SpotlightCard component

const teamMembers = [
  {
    id: 1,
    name: "Akash Halli",
    email: "02fe22bcs012@kletech.ac.in",
    linkedin: "https://www.linkedin.com/in/akash-halli-3ab6aa231/",
    image: "./me.jpeg",
  },
  {
    id: 2,
    name: "Suhan Jamadar",
    email: "02fe22bcs048@kletech.ac.in",
    linkedin:
      "https://www.linkedin.com/in/suhan-jamadar-525740269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    image: "./Suhan.jpeg",
  },
  {
    id: 3,
    name: "Snigdha Bali",
    email: "02fe22bcs141@kletech.ac.in",
    linkedin:
      "https://www.linkedin.com/in/snigdha-bali-7b7260295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    image: "./Snigdha.jpeg",
  },
  {
    id: 4,
    name: "Vaibhavi Patil",
    email: "02fe22bcs169@kletech.ac.in",
    linkedin:
      "https://www.linkedin.com/in/vaibhavi-patil-71571832b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    image: "./Vaibhavi.jpeg",
  },
];

const AboutUs = () => {
  return (
    <div className="p-8 bg-gradient-to-b from-black to-gray-900 text-white min-h-[80vh] flex flex-col items-center">
      {/* Heading with animation */}
      <motion.h1
        className="text-4xl font-extrabold mb-10 text-center text-orange-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Meet Our Team
      </motion.h1>

      {/* Team Members Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3, // Delay between animations of child components
              ease: "easeOut", // Smooth easing
              duration: 0.8, // Longer duration for a smoother effect
            },
          },
        }}
      >
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            className="flex justify-center items-center"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            {/* SpotlightCard wrapping for each member */}
            <SpotlightCard
              className="custom-spotlight-card w-full max-w-sm p-6 rounded-xl overflow-hidden relative shadow-2xl"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              {/* Profile image outside of spotlight effect */}
              <div className="relative z-10">
                <img
                  src={member.image}
                  alt={`${member.name}'s profile`}
                  className="w-32 h-32 rounded-full mb-4 shadow-lg mx-auto"
                />
              </div>

              <h2 className="text-2xl font-bold text-orange-400 text-center">
                {member.name}
              </h2>
              <p className="text-sm text-gray-300 mt-2 text-center">
                {member.email}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-orange-500 text-black rounded-full hover:bg-orange-400 hover:text-white transition-all block text-center"
              >
                LinkedIn Profile
              </a>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AboutUs;
