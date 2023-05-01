import Slider from 'react-slick'

import './index.css'

const StoriesFeed = props => {
  const {list} = props
  const settings = {
    dots: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      {breakpoint: 768, settings: {slidesToShow: 7, slidesToScroll: 1}},
      {breakpoint: 600, settings: {slidesToShow: 4, slidesToScroll: 1}},
    ],
  }
  return (
    <ul className="stry-list">
      <Slider {...settings}>
        {list.map(each => (
          <li className="stry" key={each.userId}>
            <img alt="user story" className="stry-icon" src={each.storyUrl} />
            <p className="user">{each.userName}</p>
          </li>
        ))}
      </Slider>
    </ul>
  )
}

export default StoriesFeed
