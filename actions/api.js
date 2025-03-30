'use server';
import courses from './courses.json';

export async function GetAllCourses() {
    return {
        data: courses,
        courseMap: courses.reduce((a, c, i) => {
        a[c.id] = c
        a[c.id].index = i
        return a
        }, {})
    };
}