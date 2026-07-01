import { ReactNode } from "react";

export interface User {
  username: string;
  email: string;
  initials: string;
  isLoggedIn: boolean;
}

export interface Slide {
  image: string;
  label: string;
  title: string;
  body: string;
}

export interface Feature {
  icon: ReactNode;
  text: string;
}

export interface Pillar {
  num: string;
  title: string;
  body: string;
  bg: string;
  fg: string;
  hi: string;
}
