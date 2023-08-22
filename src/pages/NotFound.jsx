import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notPage from "../assets/404.png"

function NotFound() {
  const navigate = useNavigate();
  const [countdown, seCountdown] = useState(5);

  useEffect(() => {
    setTimeout(() => {
      if (countdown === 0) {
        navigate("/");
      }
      seCountdown(countdown - 1);
    }, 1000);
  }, [countdown, navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-slate-800 border rounded-lg shadow-md pb-10 bg-gray-100">
        <div>
          <img src={notPage} alt=""  className="h-[500px]"/>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="texy-[1rem]">
            <span>5 秒後回到首頁</span>
          </div>
          <div className="text-[1.5rem]">
            <span>{countdown} 秒</span>
          </div>
          <div>
            <a href="/">
              <button className="btn btn-add text-base">
                回首頁
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound