import React from "react";
import styles from "./Hero.module.css";
import heroImg from "../../assets/hero/me.png"

export default function Hero() {
  return (
    <section className={styles.container} id="home">
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Valery</h1>
        <p className={styles.description}>
          I am a senior at Delaware State University, majoring in Computer Science. I will be graduating in May 2026.
        </p>
        <a href="mailto:louisvalery2022@gmail.com" className={styles.contactBtn}>
          Contact Me
        </a>
      </div>
      <img
        src={heroImg}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};

