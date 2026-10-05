import { useId } from 'react';

// Original decorative illustration. Deliberately not a geographic map or location photograph.
export function Landscape({ variant = 0, className = '' }: { variant?: number; className?: string }) {
  const id = useId().replace(/:/g, '');
  const colors = [['#d7dfb0', '#6c8052', '#e58c54'], ['#c2d4cb', '#4e7765', '#c87852'], ['#e5dba8', '#858553', '#ba6848']][variant % 3];
  return <svg className={`landscape ${className}`} viewBox="0 0 900 720" role="img" aria-label="Ilustrasi artistik bentang alam, persawahan, dan permukiman. Bukan peta wilayah sebenarnya.">
    <defs>
      <pattern id={`${id}-grain`} width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1" cy="2" r=".6" fill="#243e35" opacity=".09"/><circle cx="4" cy="5" r=".4" fill="#fff" opacity=".18"/></pattern>
      <pattern id={`${id}-rows`} width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)"><path d="M0 0V32" stroke="#f5f0d3" strokeWidth="1.5" opacity=".38"/></pattern>
      <clipPath id={`${id}-clip`}><rect width="900" height="720" rx="2"/></clipPath>
    </defs>
    <g clipPath={`url(#${id}-clip)`}>
      <rect width="900" height="720" fill={colors[0]}/>
      <g className="landscape-sun"><circle cx="690" cy="146" r="64" fill="#efab67"/><circle cx="690" cy="146" r="78" fill="none" stroke="#efab67" opacity=".45"/></g>
      <g className="landscape-clouds" fill="#f4f0dd" opacity=".85"><path d="M70 110h143c-8-17-23-22-40-16-9-32-48-36-64-9-19-7-31 1-39 25Z"/><path d="M428 62h98c-6-12-18-17-29-12-11-21-33-22-45-5-11-4-20 2-24 17Z"/></g>
      <g className="landscape-back"><path d="M-30 340 185 163 297 270 455 121 655 328 787 215 958 350V720H-30Z" fill="#9aaa80"/><path d="m185 163 38 104 74 3ZM455 121l34 148 74-36Z" fill="#b9c399"/><path d="M-20 380q155-128 321-28t318-27q147-83 312 26v370H-20Z" fill={colors[1]}/></g>
      <g className="landscape-mid"><path d="M-20 416q190-111 405 47t534-100v357H-20Z" fill="#b9bf79"/><path d="M-20 416q190-111 405 47t534-100v357H-20Z" fill={`url(#${id}-rows)`}/>
      <path d="M580 365q-185 82-110 132t-25 92q-98 26-120 131h127q-17-65 67-99t44-98q-124-52 45-140Z" fill="#d6e2d3"/>
      <path d="M590 375q-149 63-119 97m70 88q-25 36-79 47" fill="none" stroke="#91b5ab" strokeWidth="2"/>
      <path d="M-30 580q130-143 342-20l60 160H-30Z" fill="#d9bd79"/><path d="M-30 580q130-143 342-20l60 160H-30Z" fill={`url(#${id}-rows)`}/>
      <path d="M560 575q130-179 368-91v236H570Z" fill="#8e9d63"/><path d="M560 575q130-179 368-91v236H570Z" fill={`url(#${id}-rows)`}/>
      <path d="M30 524q90-72 225-18m366 37q117-103 279-52M4 622q135-64 291-22" stroke="#eef0c9" strokeWidth="4" fill="none"/>
      </g>
      <g className="landscape-village">
        {[{x:127,y:374,s:1},{x:215,y:405,s:.8},{x:292,y:354,s:.66},{x:685,y:399,s:.8},{x:751,y:434,s:.65},{x:605,y:425,s:.55}].map((h,i)=><g key={i} transform={`translate(${h.x} ${h.y}) scale(${h.s})`}><path d="m-10 7 55-37 56 37Z" fill={colors[2]}/><path d="m45-30 56 37H45Z" fill="#934e37"/><path d="M0 7h90v50H0Z" fill="#f2e4bd"/><path d="M45 7h45v50H45Z" fill="#ddcba0"/><path d="M15 28h12v15H15Zm44-8h12v13H59Z" fill="#3c5849"/><path d="M32 30h13v27H32Z" fill="#785c3d"/></g>)}
        {[{x:87,y:383},{x:336,y:409},{x:795,y:390},{x:582,y:405},{x:240,y:335}].map((t,i)=><g key={i} transform={`translate(${t.x} ${t.y})`}><path d="M0-65V20" stroke="#5b6240" strokeWidth="5"/><ellipse cy="-43" rx="22" ry="35" fill="#314f3f"/><ellipse cx="-8" cy="-47" rx="13" ry="28" fill="#496447"/></g>)}
      </g>
      <g className="landscape-front"><path d="M-20 693q94-59 199-30t242 78H-20Z" fill="#334e3b"/><path d="M662 720q62-82 258-127v127Z" fill="#46603e"/>
      <g transform="translate(75 638)"><path d="M0 90V-20" stroke="#4b5337" strokeWidth="8"/><path d="M0-20q-70-55-94-12 53-8 94 12Zm0 0q61-62 98-16-49-7-98 16Zm0 0q-39-79-68-53 25 20 68 53Zm0 0q30-84 59-61-10 37-59 61Z" fill="#254435"/></g>
      <g transform="translate(836 625)"><path d="M0 120V-55" stroke="#3a4e34" strokeWidth="9"/><ellipse cy="-65" rx="37" ry="69" fill="#2b4837"/><ellipse cx="-10" cy="-75" rx="22" ry="50" fill="#3e5e40"/></g></g>
      <rect width="900" height="720" fill={`url(#${id}-grain)`}/>
      <g fill="#314b3c"><path d="m380 193 9-5 9 5-9-1Zm32-20 8-4 8 4-8-1Zm-57-8 6-3 6 3-6-1Z"/></g>
    </g>
  </svg>;
}
