import {useState} from "react";
import "./App.css";


function App(){

const [prompt,setPrompt]=useState("");
const [image,setImage]=useState("");
const [loading,setLoading]=useState(false);


async function generate() {

    setLoading(true);

    try {

        const res = await fetch("http://127.0.0.1:8000/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt
            })
        });

        const data = await res.json();

        console.log(data);

        if (data.error) {
            alert(data.error);
            setLoading(false);
            return;
        }

        if (!data.images || data.images.length === 0) {
            alert("No image returned from Forge");
            setLoading(false);
            return;
        }

        setImage("data:image/png;base64," + data.images[0]);

    } catch (err) {
        console.error(err);
        alert("Connection failed");
    }

    setLoading(false);
}



return (

<div className="app">


<div className="sidebar">

<h1>
<span>K</span> Knox
</h1>


<button>
＋ New Chat
</button>


<h3>Today</h3>

<p>🤖 Futuristic Robot</p>
<p>🌃 Cyberpunk City</p>
<p>🚀 Space Scene</p>


<div className="bottom">

<p>⚙ Settings</p>
<p>🟢 API Online</p>

</div>


</div>



<div className="main">


<header>
☰

<h2>Knox</h2>

<div>
◐
</div>

</header>



<div className="chat">


{prompt &&

<div className="user">

You:
<br/>

{prompt}

</div>

}



{loading &&
<div className="bot">
Generating image...
</div>
}



{image &&

<div className="bot">

<h3>Knox</h3>

<p>Here is your image:</p>


<img src={image}/>


<button>
Download
</button>


</div>

}


</div>



<div className="inputBox">


<input

placeholder="Describe the image you want to generate..."

value={prompt}

onChange={
e=>setPrompt(e.target.value)
}

/>


<button onClick={generate}>
➤ Generate
</button>


</div>



<footer>

Knox AI Image Generator • Powered by Stable Diffusion

</footer>


</div>


</div>


)

}


export default App;