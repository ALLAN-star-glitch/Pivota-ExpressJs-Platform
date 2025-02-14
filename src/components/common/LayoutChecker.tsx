"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NavbarWebsite from "../website/navbar/NavbarWebsite";
import Footer from "../website/footer/Footer";

interface LayoutCheckerProps {
  children: React.ReactNode;
}

const LayoutChecker = ({ children }: LayoutCheckerProps) => {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  useEffect(() => {
    if (isDashboardRoute) return; // Prevent scripts from loading in the dashboard

    // Load MyAlice WebChat
    const myAliceScript = document.createElement("script");
    myAliceScript.innerHTML = `!function(){var e,t,n,a;window.MyAliceWebChat||((t=document.createElement("div")).id="myAliceWebChat",(n=document.createElement("script")).type="text/javascript",n.async=!0,n.src="https://widget.myalice.ai/index.js",(a=(e=document.body.getElementsByTagName("script"))[e.length-1]).parentNode.insertBefore(n,a),a.parentNode.insertBefore(t,a),n.addEventListener("load",(function(){MyAliceWebChat.init({selector:"myAliceWebChat",number:"254740955111",message:"",color:"#25D366",channel:"wa",boxShadow:"none",text:"Message Us",theme:"light",position:"left",mb:"20px",mx:"20px",radius:"20px"})})))}();`;
    document.body.appendChild(myAliceScript);

    // Load Tawk.to script
    const tawkScript = document.createElement("script");
    tawkScript.type = "text/javascript";
    tawkScript.async = true;
    tawkScript.src = 'https://embed.tawk.to/67afa49512b6af190bdc75b3/1ik31lql9';
    tawkScript.charset = 'UTF-8';
    tawkScript.setAttribute('crossorigin', '*');
    document.body.appendChild(tawkScript);
  }, [isDashboardRoute]);

  return (
    <>
      {!isDashboardRoute && <NavbarWebsite />}
      {children}
      {!isDashboardRoute && <Footer />}
    </>
  );
};

export default LayoutChecker;
