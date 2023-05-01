import Slider from 'react-slick'

import './index.css'

const ProfileStories = props => {
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
    <ul className="story-list">
      <Slider {...settings}>
        {list.map(each => (
          <li className="stry-crd" key={each.id}>
            <img alt="user story" className="story-icon" src={each.image} />
          </li>
        ))}
      </Slider>
    </ul>
  )
}

export default ProfileStories
