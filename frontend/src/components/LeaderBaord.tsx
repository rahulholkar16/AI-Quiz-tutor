import React from "react";
import { Trophy, Medal, Award } from "lucide-react";

const data = [
  {
    rank: 1,
    name: "Alex Morgan",
    points: "9,250 Pts",
    color: "text-amber-400",
    icon: <Trophy className="text-amber-400" />,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0wCfRtD0U5YxNcjdTtRKaOELxrq2taOd3AtSfpPPJWF-Aptd1Qz264mngyeWauHcq1BnSZvYHMXDr38P_wAVg_79L7TOXc8WvyHcjKATgXJNdCqRY8VKGOlIKosKOdO67c-s4Xifjkxb0bVBuopFX1otWowqBY9lDAXUsaN-_aMQdTT3GqZYPp7IM9W5YNlLKKQOFZaqfrFhROjhGaQrMEcw2pIerGGzfJbTvujGDccB_6tvZ3_Cw4JQcP0-7pN1b5ffH17260HM",
  },
  {
    rank: 2,
    name: "Ben Carter",
    points: "8,980 Pts",
    color: "text-slate-400",
    icon: <Medal className="text-slate-400" />,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8hQFiZtefcKCZSpJbBw-bbl85OBCUAduN3Jbs6bCJbmy0Pbmq2ohVEQVGPqGAPXdtFjpnFy4N5C2ozrqtVhVOX0DhKhHT0HYwrIGSJ6x8xkuPNDsy10MmaFAfpbDmnTMHZIfMHXfsXT3jeH6ihWbQGnDNRI_VqcpbjhfPW11YxMfMyX8QhX6e7J4FvwOJkmU_4aV2hbIPAHNAgPLL8M4trwxBOpiTJpxSwNIBJn9s39Sk1fOJZJ0SExNDHwNOco_Br2TaN_pj83A",
  },
  {
    rank: 3,
    name: "Clara Stone",
    points: "8,750 Pts",
    color: "text-orange-600",
    icon: <Award className="text-orange-600" />,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcSi-70g2QdKCk6q8XyD86IEYv212PhhslEVbzS25duh2O9Fp6MVUS59dTxyg9HREdx_iZljfTi5hoM6VmKlCeHa6XXSEPwlqaL8VnbM2_-vzs-Y8J1pICUl04Rp1cec6xj_n46g-Eprb_PJ4hDCEOevzcdFVhazIJY5BjuChbqZp8fe7auEcTB-n8csOC3iXLPyppJeCel8Qq3LQCU2Yi44kixR2BgnJpwu1TPww2orbqEFAyvq653izqqfKCxIW8XWUToQYdXHw",
  },
];

const Leaderboard: React.FC = () => {
 return (
    <div className="flex flex-col gap-4 rounded-xl p-6 border border-white/10 bg-white/5">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-xl font-bold">Leaderboard</h2>
        <a href="#" className="text-[#2b2bee] text-sm hover:underline">
          View All
        </a>
      </div>

      {data.map((user, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition"
        >
          <span className={`${user.color} font-bold w-5 text-center`}>{user.rank}</span>
          <img src={user.img} alt={user.name} className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <p className="text-white font-medium">{user.name}</p>
            <p className="text-white/60 text-sm">{user.points}</p>
          </div>
          {user.icon}
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;