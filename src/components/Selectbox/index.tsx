"use client";
import cn from 'classnames';
import styles from './styles.module.css';
import { sofia } from "@/app/fonts";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface IProps {
  options: string[];
};

export default function Selectbox({ options }: IProps) {
  const [activeOption, setOption] = useState(options[0]);
  const [dropdownActive, toggleDropdown] = useState(false);
  const buttonRef: MutableRefObject<any> = useRef(null);
  const handleOptionClick = (option: string) => {
    setOption(option);
    toggleDropdown(false);
  }

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (buttonRef.current && !buttonRef.current!.contains(event.target)) {
        if (dropdownActive) {
          toggleDropdown(false);
        }
      }
    }
    if (dropdownActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef, dropdownActive, toggleDropdown]);

  return (
    <div ref={buttonRef} className={cn([styles.selectbox, sofia.className])}>
      <button
        className={styles.button}
        onClick={() => toggleDropdown(!dropdownActive)}
      >
        <span className={styles.buttonInner}>
          {activeOption}
        </span>
      </button>
      <div className={cn(
        styles.dropdown,
        {
          [styles.dropdownActive]: dropdownActive
        }
      )}>
        <div className={cn(
          styles.list
        )}>
          {options.map(name => (
            <div
              className={styles.listItem}
              onClick={() => handleOptionClick(name)}
              key={name}
            >
              {name}
              <Image
                src="/arrow.svg"
                alt=""
                className={styles.icon}
                width={20}
                height={17}
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}