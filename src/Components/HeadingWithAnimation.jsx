import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Power2 } from "gsap/all";
import { FaCogs } from "react-icons/fa";

function HeadingWithAnimation({ user }) {
  const gearRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const badgesRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, descRef.current, badgesRef.current], {
        opacity: 0,
        y: 30,
      });

      const tl = gsap.timeline();

      // Gear spin animation
      gsap.from(gearRef.current, {
        rotation: -360,
        duration: 12,
        repeat: -1,
        ease: "none",
      });

      tl.from(gearRef.current, {
        scale: 0,
        duration: 1,
        ease: Power2.easeOut,
      })
        .to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          badgesRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.2"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative  space-y-6 sm:space-y-8 ">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
        <div
          ref={gearRef}
          className="p-3 bg-neutral-light/20 rounded-xl shadow-lg"
        >
          <FaCogs className="text-4xl sm:text-5xl text-primary-dark" />
        </div>
        <div ref={headingRef} className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-primary-dark mb-2">
            Welcome Back,{" "}
            <span className="text-primary">{user?.firstname || "User"}</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-dark font-medium">
            Car Wash Management Dashboard
          </p>
        </div>
      </div>

      {/* Description Section */}
      <div
        ref={descRef}
        className="bg-neutral-light/20  rounded-2xl p-4 sm:p-6 shadow-xl border border-neutral-light/30 text-center sm:text-left"
      >
        <p className="text-sm sm:text-base lg:text-lg text-neutral-dark leading-relaxed">
          Manage your car wash stations, monitor real-time operations, and
          optimize service packages.
        </p>
      </div>

      {/* Badges Section */}
      <div
        ref={badgesRef}
        className="flex flex-wrap justify-center sm:justify-start gap-4 text-neutral-dark"
      >
        <div className="badge flex items-center gap-2 bg-neutral-light/20 px-3 sm:px-4 py-2 shadow-sm rounded-lg text-sm sm:text-base">
          <span>Admin Privileges</span>
        </div>
        <div className="badge flex items-center gap-2 bg-neutral-light/20 px-3 sm:px-4 py-2 shadow-sm rounded-lg text-sm sm:text-base">
          <span>Multi-station Management</span>
        </div>
      </div>
    </div>
  );
}

export default HeadingWithAnimation;
