
import React from 'react';

const Item = ({title, value, className, index}) => {
    return (
      <div className={`${className} px-4 py-5  sm:px-6`} key={index}>
        <div className="text-sm font-medium text-gray-500">
          {title}
        </div>
        <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {value}
        </div>
      </div>
    )
}

const ManagedCourseCard = ({ children, course, index, isSearched = false }) => {

    return (
      <div className={`${isSearched ? "border-indigo-600" : "bg-gray-200"} bg-white border shadow overflow-hidden sm:rounded-lg mb-3`}>
            { Object.keys(course).map((key, i) =>
                <Item
                    key={key}
                    className={`${i % 2 ? "bg-gray-50" : "bg-white"}`}
                    title={key[0].toUpperCase() + key.slice(1)}
                    value={course[key]}
                    index={`${index}_${key}`}
                />
            )}
            <div className="bg-white px-4 py-5 sm:px-6">
                {children}
            </div>
        </div>
    )
}

export default ManagedCourseCard;