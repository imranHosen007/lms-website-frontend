import React from "react";
import AddCircle from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";
interface Props {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisite: { title: string }[];
  setPrerequisite: (prerequisite: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
}
const CourseData: React.FC<Props> = ({
  benefits,
  setBenefits,
  prerequisite,
  setPrerequisite,
  active,
  setActive,
}) => {
  // -----Handle-Benefits-Change----

  const handleBenefitsChange = (index: number, value: string) => {
    const updatedBenfits = [...benefits];
    updatedBenfits[index].title = value;
    setBenefits(updatedBenfits);
  };

  // ------HandleAddBenefits------

  const handleAddBenefits = () => {
    if (benefits[benefits.length - 1]?.title != "") {
      setBenefits([...benefits, { title: "" }]);
    } else {
      toast.error(`Please Fill the fileds Add New `);
    }
  };

  // -----handlePrerequisiteChange----------

  const handlePrerequisiteChange = (index: number, value: string) => {
    const updatePrerequisite = [...prerequisite];
    updatePrerequisite[index].title = value;
    setPrerequisite(updatePrerequisite);
  };

  // --------handleAddPrerequisite---------

  const handleAddPrerequisite = () => {
    if (prerequisite[prerequisite.length - 1]?.title != "") {
      setPrerequisite([...prerequisite, { title: "" }]);
    } else {
      toast.error(`Please Fill the fileds Add New `);
    }
  };

  // -----------Handle-Next------
  const hanldeNext = () => {
    if (
      benefits[benefits.length - 1]?.title != "" &&
      prerequisite[prerequisite.length - 1]?.title != ""
    ) {
      setActive(active + 1);
    } else {
      toast.error(`Please Fill the fileds for go to next`);
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-24 block">
      <div>
        {" "}
        <label htmlFor="benefits" className="label !text-[20px]">
          What Are The Benefits for Student In This Course?
        </label>
        <br />
        {benefits?.map((benefit, index) => {
          return (
            <input
              type="text"
              key={index}
              onChange={(e) => handleBenefitsChange(index, e.target.value)}
              value={benefit.title}
              className="input-box my-2"
              placeholder="You Will able to build a full stack lms platfrom...."
            />
          );
        })}
        <AddCircle
          style={{ margin: "10px 0px", width: "30px", cursor: "pointer" }}
          onClick={handleAddBenefits}
        />
      </div>{" "}
      <div>
        {" "}
        <label htmlFor="benefits" className="label !text-[20px]">
          What are the prerequisite for startring this course?
        </label>
        <br />
        {prerequisite?.map((benefit, index) => {
          return (
            <input
              type="text"
              key={index}
              onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
              value={benefit.title}
              className="input-box my-2"
              placeholder="You Will able to build a full stack lms platfrom...."
            />
          );
        })}
        <AddCircle
          style={{ margin: "10px 0px", width: "30px", cursor: "pointer" }}
          onClick={handleAddPrerequisite}
        />
      </div>
      <div className="flex w-full justify-between items-center">
        <button
          onClick={() => setActive(active - 1)}
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
        >
          Prev
        </button>
        <button
          onClick={hanldeNext}
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseData;
