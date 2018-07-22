import React from "react"

const Img = ({ src }) => (
    <div>
        <img src={`http://13.211.228.211${src}`} />
    </div>
)

export default Img