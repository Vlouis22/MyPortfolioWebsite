import React from 'react'
import styles from "./Resume.module.css"


export default function Resume() {
  return (
    <section className={styles.resume} id='resume'>
        <h2 className={styles.title}>My Resume</h2>
        <iframe src="/assets/ValeryLouisResume.pdf" className={styles.resumeDisplay} title="Resume"></iframe>
    </section>
  )
}
