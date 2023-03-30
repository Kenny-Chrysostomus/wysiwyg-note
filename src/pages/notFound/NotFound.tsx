import React from 'react'
import { Link } from 'react-router-dom';

const notFound = () => {
  return (
    <div>
      <h1>404 not found</h1>
      <p>お探しのページは見つかりませんでした。URLの打ち間違いがないか確認してください。</p>
      <Link to="/">ホーム</Link>
    </div>
  )
}

export default notFound;