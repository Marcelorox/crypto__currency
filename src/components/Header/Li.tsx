import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  index: number | null;
  currentIndex: number | null;
  label: string;
  to: string;
}

export const NavItem: React.FC<NavItemProps> = ({ index, currentIndex, label, to, ...props }) => {
  const isActive = index === currentIndex;

  return (
    <li
      {...props}
      className={`${isActive ? "text-rose-500 hover:text-rose-600 ml-5 mr-3" : "text-cyan-300 hover:text-cyan-500 gap-5 ml-5  mr-3"}`}
    >
      <Link to={`${to}`}>{label}</Link>
    </li>
  );
};
