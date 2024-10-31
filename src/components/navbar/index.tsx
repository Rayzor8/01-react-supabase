import React from "react";
import { Link } from "react-router-dom";
import Container from "../ui/container";

export default function Navbar() {
  const navItems = [
    {
      label: "Home",
      path: "/",
    },
  ];
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 flex-wrap gap-2">
        <Link to="/">
          <h1 className="text-3xl font-bold text-blue-600">Pokedecks</h1>
        </Link>
        <ul className="flex gap-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="font-bold text-blue-600 hover:text-blue-800 transition-colors">{item.label}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
