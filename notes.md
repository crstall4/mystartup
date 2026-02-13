# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 98.86.101.99
I accidentally created my AWS server not according to canvas, so I had to do it over again. When buying my DNS name, instead of doing it through amazon, I decided to just use the one I already bought through cloudflare. the DNS is claytonstallings.com. I set up that domain according to the canvas instructions and got it working properly.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

##### Structure

This part was very easy. I have had experience working with HTML before, so the only thing I had to do was review some simple syntax. 
I reviewed how to use anchor tags, and the attributes of img tags.
[Here is the CodePen I created](https://codepen.io/clayton-the-reactor/pen/ByzRWLN)

##### Input

This part was also very easy. I just looked at the format of the codepen and was able to figure everything out. The only thing I had to search up, was setting a default color in the color picker. It ended up being an attribute named "value" that needed to be added.
[Here is the CodePen I created](https://codepen.io/clayton-the-reactor/pen/EaymWbp)

##### Media

This part was also very easy. Just followed the format
[Here is the CodePen I created](https://codepen.io/clayton-the-reactor/pen/YPWVZOK)

Another note for later, this is how i deployed the code to my awsbox: ./deployFiles.sh -k /home/clayton/Documents/startup.pem -h 98.86.101.99 -s startup

I used the IP because I registered my domain via cloudflare, and cloudflare is proxying my domain. Because of that, the script doesnt work when i type my domain in that spot. However, using the IP instead causes no problems.

## CSS

I was following the CSS tutorial in canvas and made this code pen. I believe when it comes to CSS, simpler is better. 
https://codepen.io/clayton-the-reactor/pen/WbxKGyG

I was following another CSS tutorial and created this code pen. This focuses on using flex display in CSS.
https://codepen.io/clayton-the-reactor/pen/vEKaXQo


Making the CS for my website was pretty straight forward. I used a lot of the format that simon used. I like the simple bootstrap styling. I think often times with websites, simpler is better. Kinda like qqtimer, my favorite rubiks cube timer. they dont overwhelm you. its all very simple and organized.


## React Part 1: Routing

As I did this, canvas walked me through a simple node/npm tutorial. These are the fundamentals of using npm that canvas wanted me to remember:

1. Create your project directory
2. Initialize it for use with NPM by running npm init -y
3. Make sure .gitignore file contains node_modules
4. Install any desired packages with npm install <package name here>
5. Add require('<package name here>') to your application's JavaScript
6. Use the code the package provides in your JavaScript
7. Run your code with node index.js

I also ran through a canvas react demo. This is how to get react up and running:
`npm init -y`
`npm install vite@latest -D`
`npm install react react-dom`
*create index.html and index.jsx files*
`npx vite` to run the server

Followed React tutorial and made this codepen:
https://codepen.io/clayton-the-reactor/pen/RNRvObW


## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
