import { createElement } from 'react'

/**
 * Titre de section : étiquette rouge + H2 (ou H1) avec tailles clamp unifiées.
 */
export default function SectionTitle({
  label,
  title,
  children,
  as = 'h2',
  align = 'center',
  size = 'section',
  className = '',
  titleClassName = '',
}) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  const sizeClass = size === 'hero' ? 'text-title-hero' : 'text-title-section'

  return (
    <div className={`${alignClass} ${className}`.trim()}>
      {label && (
        <p className="font-condensed font-bold text-sm tracking-[0.3em] uppercase text-red-sc mb-3 sm:mb-4">
          {label}
        </p>
      )}
      {createElement(
        as,
        {
          className:
            `font-condensed font-black uppercase leading-none text-cream ${sizeClass} ${titleClassName}`.trim(),
        },
        title
      )}
      {children}
    </div>
  )
}
