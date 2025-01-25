import { useEffect, useLayoutEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { getAuthData } from "../Hooks/useSecurity";
import { FaCar, FaShower, FaRegStar, FaCogs } from "react-icons/fa";
import gsap from "gsap";
import { Power2 } from "gsap/all";

function Package() {
  const { user } = getAuthData();
  const comp = useRef(null);
  const gearRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const badgesRef = useRef(null);
  const outletRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(
        [
          headingRef.current,
          descRef.current,
          badgesRef.current,
          outletRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      // Gear spin animation
      gsap.from(gearRef.current, {
        rotation: -360,
        duration: 12,
        repeat: -1,
        ease: "none",
      });

      // Master timeline
      const tl = gsap.timeline();

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
        )
        .to(
          outletRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );

      // Hover effects for badges
      gsap.utils.toArray(".badge").forEach((badge) => {
        gsap.to(badge, {
          scale: 1.05,
          duration: 0.3,
          paused: true,
          ease: "power2.out",
          onMouseEnter: () => badge._tween.play(),
          onMouseLeave: () => badge._tween.reverse(),
        });
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={comp}
      className="min-h-screen bg-gradient-to-br from-background to-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 relative ">
          {/* Animated background elements */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary-light/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-light/20 rounded-full blur-3xl" />

          <div className="relative space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div
                ref={gearRef}
                className="p-3 bg-neutral-light/20 backdrop-blur-sm rounded-xl shadow-lg"
              >
                <FaCogs className="text-4xl text-primary-dark" />
              </div>
              <div ref={headingRef}>
                <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-2">
                  Welcome Back,{" "}
                  <span className="text-primary">{user.firstname}</span>
                </h1>
                <p className="text-lg text-neutral-dark font-medium">
                  Car Wash Management Dashboard
                </p>
              </div>
            </div>

            <div
              ref={descRef}
              className="bg-neutral-light/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-neutral-light/30"
            >
              <p className="text-lg text-neutral-dark leading-relaxed">
                <FaCar className="inline-block mr-2 mb-1 text-primary" />
                Manage your car wash stations, monitor real-time operations, and
                optimize service packages. Track performance metrics and
                maintain seamless control over your entire network.
                <FaShower className="inline-block ml-2 mb-1 text-primary" />
              </p>
            </div>

            <div ref={badgesRef} className="flex gap-4 text-neutral-dark">
              <div className="badge flex items-center gap-2 bg-neutral-light/20 px-4 shadow-sm py-2 rounded-lg">
                <FaRegStar className="text-primary" />
                <span>Admin Privileges</span>
              </div>
              <div className="badge flex items-center gap-2 bg-neutral-light/20 px-4 py-2 shadow-sm rounded-lg">
                <FaCar className="text-primary" />
                <span>Multi-station Management</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Outlet */}
        <div ref={outletRef} className="   border border-neutral-light/30">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Package;
