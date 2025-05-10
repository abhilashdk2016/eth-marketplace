

import React from 'react';
import ActiveLink from './ActiveLink';

const BreadcrumbItem = ({item, index}) => {
  return (
    <li
      className={`${index == 0 ? "pr-4" : "px-4"} font-medium text-gray-500 hover:text-gray-900`}>
      <ActiveLink href={item.href} label={item.label}>
      </ActiveLink>
    </li>
  )
}

const BreadCrumb = ({items, isAdmin}) => {
  return (
    <nav aria-label="breadcrumb" className="mb-4">
        <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
          {
            items.map((item, i) =>
              <React.Fragment key={item.href}>
              { !item.requireAdmin &&
                <BreadcrumbItem
                  item={item}
                  index={i}
                />
              }
              { item.requireAdmin && isAdmin &&
                <BreadcrumbItem
                  item={item}
                  index={i}
                />
              }
            </React.Fragment>
            )
          }
        </ol>
    </nav>
  )
}

export default BreadCrumb