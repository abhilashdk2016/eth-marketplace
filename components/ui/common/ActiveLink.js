import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ActiveLink = ({ href, label, classname = ''}) => {
    const pathName = usePathname();
  return (
    <Link className={`${classname} ${pathName === href ? 'text-orange-500' : ''}`} href={href}>{label}</Link>
  )
}

export default ActiveLink