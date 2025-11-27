export const getRandomColor = () => {
    const colors = ["#f87171","#34d399","#60a5fa","#facc15","#a78bfa"];
    return colors[Math.floor(Math.random() * colors.length)];
};
