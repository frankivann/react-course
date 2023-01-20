import { useState } from 'react'

export function TwitterFollowCard ({ name, username }) {
  const [isFollowing, setIsFollowing] = useState(false)

  const text = isFollowing ? 'siguiendo' : 'seguir'
  const ButtonClassName = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'

  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <article className='tw-followCard'>
      <header className='tw-followCard-header'>
        <img
          className='tw-followCard-avatar'
          alt='El avatar de midudev'
          src={`https://unavatar.io/${name}`}
        />
        <div className='tw-followCard-info'>
          <strong>{name}</strong>
          <span className='tw-followCard-infoUserName'>
            @{username}
          </span>
        </div>
      </header>

      <aside className='tw-followCard-action'>
        <button className={ButtonClassName} onClick={handleClick}>
          <span className='tw-followCard-text'>
            {text}
          </span>
          <span className='tw-followCard-stopFollow'>
            dejar de seguir
          </span>
        </button>
      </aside>
    </article>
  )
}
