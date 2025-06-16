import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>About us</h1>
      <p>
        This weather application provides real-time weather information for cities worldwide.
        We use data from OpenWeatherMap API to bring you all an accurate forecasts. You can believe us regarding the information as we are reliable means. We are proud to connect you all to the world.
      </p>
      <h1>Features</h1>
      <ul>
        <li>Current weather conditions</li><br />
        <li>Location selection</li><br />
        <li>Persistent user preferences</li>
      </ul>
    </div>
  );
};

export default About;