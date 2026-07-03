import type { ComponentType } from "react";

export type TechnicalSkillIcon = ComponentType<{ className?: string }>;

export type TechnicalSkill = {
  skillName: string;
  skillIcon: TechnicalSkillIcon;
};

interface TechnicalSkillscardProps {
  cardHeading: string;
  cardDescription?: string;
  skills: TechnicalSkill[];
}

const TechnicalSkillscard = ({
  cardHeading,
  cardDescription,
  skills,
}: TechnicalSkillscardProps) => {
  return (
    <div className="technicalSkills--card">
      <h3 className="technicalSkills--cardHeading">{cardHeading}</h3>

      {cardDescription && (
        <p className="technicalSkills--cardDescription">{cardDescription}</p>
      )}
      <div className="technicalSkills--pillContainer">
        {skills.map(({ skillName, skillIcon }) => {
          const SkillIcon = skillIcon;

          return (
            <div
              key={skillName}
              className="technicalSkills--pill"
            >
              <span className="skill-icon">
                <SkillIcon className="skill-icon__svg" />
              </span>
              <p className="skill-name">{skillName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TechnicalSkillscard;
