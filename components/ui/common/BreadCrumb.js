

import React from 'react';
import ActiveLink from './ActiveLink';

const LINKS = [
  {
    label: 'Buy',
    href: '/marketplace',
  },
  {
    label: 'My Courses',
    href: '/marketplace/courses/manage',
  },
  {
    label: 'Manage Courses',
    href: '/marketplace/courses/owned',
  }
]

const BreadCrumb = () => {
  return (
    <nav aria-label="breadcrumb" className="mb-4">
        <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
          {LINKS.map((link, index) => (
            <li key={index} className={`${index === 0 ? 'pr-4' : 'px-4'} font-medium text-gray-500 hover:text-gray-900`}>
              <ActiveLink href={link.href} label={link.label} />
            </li>
          ))}
        </ol>
    </nav>
  )
}

export default BreadCrumb