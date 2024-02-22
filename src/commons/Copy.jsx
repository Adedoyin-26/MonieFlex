async function Copy(text = ''){
    try {
        await navigator.clipboard.writeText(text);
        alert('Copied!');
    } catch (error) {
        alert("Not Copied! Try again")
    }
}

export default Copy;