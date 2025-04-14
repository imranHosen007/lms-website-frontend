import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { FaLink } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface Props {
  active: number;
  setActive: (active: number) => void;
  courseContent: any;
  setCourseContent: any;
  handleSubmit: any;
}
const CourseContent: React.FC<Props> = ({
  active,
  setActive,
  courseContent,
  setCourseContent,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContent.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  // --------handleCollapsedToggle-------
  const handleCollapsedToggle = (index: number) => {
    const updateCollapsed = [...isCollapsed];

    updateCollapsed[index] = !updateCollapsed[index];

    setIsCollapsed(updateCollapsed);
  };

  // ---------HandleRemoveLink----------
  const handleLinkRemove = (index: number, linkIndex: number) => {
    const upateLink = [...courseContent];
    upateLink[index].links.splice(linkIndex, 1);
    setCourseContent(upateLink);
  };

  // ----------Handle-Add-Link--------

  const handleAddLink = (index: number) => {
    const upateLink = [...courseContent];
    upateLink[index].links.push({ title: "", url: "" });
    setCourseContent(upateLink);
  };

  // -----------Handle-Add-Content---------
  const handleAddContent = (item: any) => {
    if (item.title == "" || item.description == "" || item.videoUrl == "") {
      toast.error(`Please Fill The All Field`);
    } else {
      let newVideoSection = "";
      if (courseContent.length > 0) {
        const lastVideoSection =
          courseContent[courseContent.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        title: "",
        videoUrl: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
        suggestion: "",
      };

      setCourseContent([...courseContent, newContent]);
    }
  };

  // -------AddNewSection------
  const handleAddNewSection = () => {
    if (
      courseContent[courseContent.length - 1].title == "" ||
      courseContent[courseContent.length - 1].videoLength == "" ||
      courseContent[courseContent.length - 1].description == "" ||
      courseContent[courseContent.length - 1].videoUrl == "" ||
      courseContent[courseContent.length - 1].links[0].title == "" ||
      courseContent[courseContent.length - 1].links[0].url == ""
    ) {
      toast.error("please Fill all the filed first");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        title: "",
        videoUrl: "",
        description: "",
        videoSection: `Untitle Section ${activeSection}`,
        links: [{ title: "", url: "" }],
        suggestion: "",
      };
      setCourseContent([...courseContent, newContent]);
    }
  };

  // -----------Handle-Next----------
  const handleNext = () => {
    if (
      courseContent[courseContent.length - 1].title == "" ||
      courseContent[courseContent.length - 1].videoLength == "" ||
      courseContent[courseContent.length - 1].description == "" ||
      courseContent[courseContent.length - 1].videoUrl == "" ||
      courseContent[courseContent.length - 1].links[0].title == "" ||
      courseContent[courseContent.length - 1].links[0].url == ""
    ) {
      toast.error("Section Cant Be Empty");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-24 p-3">
      <form action="">
        {courseContent.map((item: any, index: number) => {
          const showContent =
            index == 0 ||
            item.videoSection != courseContent[index - 1].videoSection;
          return (
            <>
              <div
                className={`w-full  bg-[#cdc8c817] p-4 ${
                  showContent ? "mt-10" : "mb-0"
                }`}
              >
                {showContent && (
                  <div className="flex w-full items-center">
                    <input
                      value={item.videoSection}
                      onChange={(e) => {
                        const updatedData = [...courseContent];
                        updatedData[index].videoSection = e.target.value;
                        setCourseContent(updatedData);
                      }}
                      type="text"
                      className={`text-[20px] cursro-pointer dark:text-white text-black outline-none bg-transparent font-Poppins ${
                        item.videoSection == "Untitle Section"
                          ? "w-[170px]"
                          : "w-min"
                      }`}
                    />
                    <BiPencil className="text-black dark:text-white cursor-pointer" />
                  </div>
                )}
                <br />
                <div className="my-0 flex items-center justify-between w-full">
                  {isCollapsed[index] ? (
                    <div>
                      {item?.title ? (
                        <p className="font-Poppins dark:text-white text-black ">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      onClick={() => {
                        if (index > 0) {
                          const updatedCourse = [...courseContent];
                          updatedCourse.splice(index, 1);
                          setCourseContent(updatedCourse);
                        }
                      }}
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                    />
                    <MdOutlineKeyboardArrowDown
                      onClick={() => handleCollapsedToggle(index)}
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      className="text-black dark:text-white"
                    />
                  </div>
                </div>

                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label htmlFor="videoTitle" className="label">
                        Video Title
                      </label>
                      <input
                        onChange={(e) => {
                          const updatedData = [...courseContent];
                          updatedData[index].title = e.target.value;
                          setCourseContent(updatedData);
                        }}
                        type="text"
                        className="input-box"
                        placeholder="Project Plan"
                        value={item.title}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="videoUrl" className="label">
                        Video Url
                      </label>
                      <input
                        id="videoUrl"
                        onChange={(e) => {
                          const updatedData = [...courseContent];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContent(updatedData);
                        }}
                        type="text"
                        className="input-box"
                        placeholder="Enter Video Url"
                        value={item.videoUrl}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="videol" className="label">
                        Video Length
                      </label>
                      <input
                        id="videol"
                        onChange={(e) => {
                          const updatedData = [...courseContent];
                          updatedData[index].videoLength = e.target.value;
                          setCourseContent(updatedData);
                        }}
                        type="number"
                        className="input-box"
                        placeholder="Enter Video Url"
                        value={item.videoLength}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor=" description" className="label">
                        Video description
                      </label>

                      <textarea
                        cols={30}
                        rows={8}
                        id=" description"
                        onChange={(e) => {
                          const updatedData = [...courseContent];
                          updatedData[index].description = e.target.value;
                          setCourseContent(updatedData);
                        }}
                        className="input-box !h-min"
                        placeholder="Enter Video description"
                        value={item.description}
                      ></textarea>
                      <br />
                    </div>
                    <div>
                      {item?.links.map((link: any, linkindex: number) => {
                        return (
                          <div className="mb-3 block">
                            <div className="w-full flex justify-between items-center">
                              <label className="label" htmlFor={link}>
                                Link {linkindex + 1}
                              </label>
                              <AiOutlineDelete
                                onClick={() =>
                                  linkindex == 0
                                    ? null
                                    : handleLinkRemove(index, linkindex)
                                }
                                className={`${
                                  linkindex == 0
                                    ? "cursor-no-drop"
                                    : "cursor-pointer"
                                } text-[20px] text-black dark:text-white`}
                              />
                            </div>
                            <input
                              onChange={(e) => {
                                const updatedData = [...courseContent];
                                updatedData[index].links[linkindex].title =
                                  e.target.value;
                                setCourseContent(updatedData);
                              }}
                              type="text"
                              className="input-box"
                              placeholder={`source Code title`}
                              value={link.title}
                            />{" "}
                            <input
                              onChange={(e) => {
                                const updatedData = [...courseContent];
                                updatedData[index].links[linkindex].url =
                                  e.target.value;
                                setCourseContent(updatedData);
                              }}
                              type="text"
                              className="input-box my-6"
                              placeholder={`source Code url`}
                              value={link.url}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddLink(index)}
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                    >
                      <FaLink className="mr-2" /> Add Link
                    </button>
                    <br />
                    {index === courseContent.length - 1 && (
                      <button
                        type="button"
                        onClick={(e) => handleAddContent(item)}
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      >
                        <AiOutlinePlusCircle className="mr-2" /> Add New Content
                      </button>
                    )}
                  </>
                )}
              </div>
            </>
          );
        })}
        <br />
        <button
          type="button"
          onClick={handleAddNewSection}
          className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
        >
          <AiOutlinePlusCircle className="mr-2" /> Add New Section
        </button>
      </form>
      <br />
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setActive(active - 1);
          }}
          type="button"
          className="w-full md:w-[100px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
        >
          Prev
        </button>{" "}
        <button
          onClick={handleNext}
          type="button"
          className="w-full md:w-[100px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseContent;
