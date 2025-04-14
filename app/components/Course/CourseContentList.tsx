import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";

interface Props {
  data: any;
  activeVideo?: number;
  isDemo?: boolean;
  setActiveVideo?: any;
}
const CourseContentList: React.FC<Props> = ({
  data,
  isDemo,
  activeVideo,
  setActiveVideo,
}) => {
  const [visibleSection, setVisibleSection] = useState<Set<string>>(
    new Set<string>()
  );

  //   ---Find-Unique-Video-Section------
  const videoSections: string[] = [
    ...new Set<string>(data?.map((item: any) => item.videoSection)),
  ];

  //   -----Total-Count------
  let totalCount: number = 0;

  //   -------Toggle-Section---------
  const toggleSection = (section: any) => {
    const newVisibleSections = new Set(visibleSection);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSection(newVisibleSections);
  };

  return (
    <div
      className={`mt-[15px] w-full ${
        isDemo && "ml-[-30px]  sticky top-24 left-0 z-30"
      }`}
    >
      {videoSections.map((item: any, index: number) => {
        const isSectionVisible = visibleSection.has(item);
        // -----Filter--Video-B-Section------
        const filterSectionVideo: any[] = data?.filter((it: any) => {
          return it.videoSection == item;
        });

        //         ----Number-Of-Video-In-Current-Section---------
        const sectionVideoCount = filterSectionVideo.length;
        const sectionVideoLength = filterSectionVideo.reduce(
          (totalLegth: number, item: any) => totalLegth + item.videoLength,
          0
        );
        const sectionVideoStartIndex: number = totalCount;
        totalCount += sectionVideoCount;

        const sectionVideoCountHours: number = sectionVideoLength / 60;
        return (
          <div
            key={index}
            className={`${isDemo && "border-b border-[#ffffff8e] pb-2"}`}
          >
            <div className="w-full flex">
              {/* -----Render-Video-Section----- */}
              <div className="w-full flex items-center justify-between">
                <h2 className="text-[22px] text-black dark:text-white">
                  {item}
                </h2>
                <button
                  className="mr-4 cursor-pointer text-black dark:text-white"
                  onClick={() => toggleSection(item)}
                >
                  {isSectionVisible ? (
                    <FaChevronUp size={20} />
                  ) : (
                    <FaChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>
            <h5 className="dark:text-white">
              {sectionVideoCount} Lesssion{" "}
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionVideoCountHours.toFixed(2)}
              {sectionVideoLength > 60 ? "Hours" : "Minutes"}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full">
                {filterSectionVideo.map(
                  (filterItem: any, Filterindex: number) => {
                    const videoIndex: number =
                      sectionVideoStartIndex + Filterindex;

                    const contentLength = filterItem.videoLength / 60;
                    return (
                      <div
                        onClick={() =>
                          isDemo ? null : setActiveVideo(videoIndex)
                        }
                        className={`w-full cusror-pointer p-2 transition-all ${
                          videoIndex == activeVideo && "bg-slate-800"
                        }`}
                      >
                        <div className="flex items-center">
                          <div>
                            <MdOutlineOndemandVideo
                              size={25}
                              className="mr-2"
                              color="£1cdada"
                            />
                          </div>
                          <h1 className="text-[18px] inline-block text-black dark:text-white break-words">
                            {filterItem.title}
                          </h1>
                        </div>
                        <h5 className="pl-8 dark:text-white text-black">
                          {filterItem.videoLength > 60
                            ? contentLength.toFixed(2)
                            : filterItem.videoLength}{" "}
                          {filterItem.videoLength > 60 ? "Hours" : "Minutes"}
                        </h5>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
