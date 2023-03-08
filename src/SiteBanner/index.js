import React from 'react';
import "./style/main.scss";

const yaleLogoImgData = "iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABGdBTUEAALGOGCHvlwAAA/5JREFUaAXtmP1x2kAQxeNM/o9KUCoIHVjugFQQpQKTChRXgFMBpALcgZQKIBWIDkwHzu+JO3tHn2CQR4P1Zp52b3dv7/ZWEhqunp6ePrwnfHxPxarWseBL7/jY4bHDF3YC4y19YQ2tlDN2uHIkF2YYO3xhDa2UM3a4ciQXZhg7fGENrZTzqWIZjiFiK9dQMoN38GRcDegfj4BqbmHkiCiw4XoDd/vhaVc9wynU/zxdjIgpo2uOch8KFSyUC3uosRWBr7qowzCEc1jGCsMEKqaJAb4YPkJBcgZlb5rTZbd7SU7IU1nHv6W3nNZPR3twsm+soUZXR9QFD91+91D21+KUua1r+oJ9kDaa+QFyBkMzblLnOAL4C27gYFEuWBv9UdrtojQuDycYYriFd3DQqCt4y47vza4jdLEJ6q5QPqi9dWDXuoK1RXVqZ/ba1OUpMRF8gBkcPJo+PFSsXmK+0BA9hktooe4qtqu7E2Ii+Bn+gxnUvHMiJJnW+Qr/wq0jwqDjlZ/i99DPjf2pSZxDP0GV17+zTZG54xrpoVwxbJqX+ECk9KY42SOYQuVcOSIKpFwn8Hn+s2KNRlewRcJAcwKoBdZuXJdngU/QJrx/Vlj2F81XHu+zMtmHFFfp1mf12MVpHzbXhLHyC5IhLObZyU36XLMMNHnhxhGybp4tTIvbmNzNlYih9Xk9kdMhQXq7lVMfgAxrYuy+F95vEzTpAcH+tFCL20dyAevm2Pi8JibF5pGg1OWQ3SNBqYvJXcCqwR85v0QOixxNLy3zlBcvF/sCi3DqhSNbE77hyJqcZ7DH5AhdHr2o6r7ZA+eXCL1+SMGKXcJbqOTCEqroOsie1TnOaLs2uX6jb8y4VT20YCWxBVq9dYGSM2QsnorQJFCxmRm3qscU3JqoxRngm0LdIdLPgei1SZq+tF6bz85TkSv4CL9DPfNf4BaeE+ExyfrqcM4m/EZu0DN4TmQki1xCPc9Lp3eKPjocsWroVt4hM6efU2xMshj94Eelj4LtG1QF94E/paR6dNow885jCranGPkEHTLEL3ooR+gHSJszNvYudUPA0gRF6GsoaREy0GHoHbJfy3+BtEh9sSxgGfrCka/4gjEyLAXqKy2BC5jCObRYM8ih7MqlLzXZPKTLVl5HthSWkWNIoc+xQn+eX05ix8QdjJRIOzdm/GhmS0+gFhb9ZlCLuBlS861dPoucgV3D65orXxnKNYU+rpB9/i+tW2gCBd2Cu0J7ucgXwDrfS9Thms+nGY05+yz48K2+YeQxL6033FZ/S40F93e2w8g8dngYfehvF2OH+zvbYWQeOzyMPvS3i7HD/Z3tMDKPHR5GH/rbxdjh/s52GJnfXYf/Ax099yeWp4N/AAAAAElFTkSuQmCC"
const YaleLogoImage = () => <image x="0" y="0" width="42" height="42" href={`data:image/jpeg;base64,${yaleLogoImgData}`} />


const YaleLogoSVG = () => {
    return (
        <svg width="41px" height="19px" viewBox="0 0 41 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-26.000000, -31.000000)">
                    <g transform="translate(26.000000, 20.000000)">
                        <YaleLogoImage></YaleLogoImage>
                    </g>
                </g>
            </g>
        </svg>
    );
}

const FortunoffTitleSVG = () => {
    return (<svg width="218px" height="40px" viewBox="0 0 218 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fontFamily="YaleNew-Roman, YaleNew" fontSize="19" fontWeight="normal" line-spacing="24">
            <g transform="translate(-121.000000, -23.000000)" fill="#1098AB">
                <text>
                    <tspan x="121" y="38">Fortunoff Video Archive</tspan>
                    <tspan x="121" y="62">for Holocaust Testimonies</tspan>
                </text>
            </g>
        </g>
    </svg>)
}

export default class extends React.Component {
    render() {
        return (
            <header className="SiteBanner">
                <div className="site-logo">
                    <a alt="Yale University Library" href="https://web.library.yale.edu/"><YaleLogoSVG></YaleLogoSVG></a>
                </div>
                <div className="site-title">
                    <a alt="Fortunoff Video Archive for Holocaust Testimonies" href="https://fortunoff.library.yale.edu/">
                    <FortunoffTitleSVG></FortunoffTitleSVG>
                    </a>
                </div>
            </header>
        );
    }
}