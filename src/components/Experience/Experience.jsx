import React from 'react';
import skills from "../data/skills.json";
import python from "../../../public/assets/python.png";
import history from "../data/history.json";
import styles from "./Experience.module.css";

export default function Experience() {

    let assetsUrl = "../assets/";

  return (
    <section id='experience' className={styles.container}>
        <h2 className={styles.title}>Experience</h2>
        <div className={styles.content}>
            <div className={styles.skills}>
                {
                    skills.map((skill, id) => {
                        return (
                        <div key={id} className={styles.skill}>
                            <div className={styles.skillImageContainer}>
                                <img src={`${assetsUrl}${skill.imageSrc}`}/>
                            </div>
                            <p>
                                {skill.title}
                            </p>
                        </div>
                        );
                    })}
            </div>
            <ul className={styles.history}>
                {
                    history.map((historyItem, id) =>{
                        return <li key={id} className={styles.historyItem}>
                                <img src={`${assetsUrl}${historyItem.imageSrc}`} alt={`${historyItem.organization}`}/>
                                <div className={styles.historyItemDetails}>
                                    <h3>{`${historyItem.role}, ${historyItem.organization}`}</h3>
                                    <p>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                                    <ul>{historyItem.experiences.map((experience, id) => {
                                        return <li key={id}>{experience}</li>
                                    })}</ul>
                                </div>
                            </li>
                    })
                }
            </ul>
        </div>
    </section>
  )
}
