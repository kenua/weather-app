export function fadeNode(nodeRef, addClass, removeClass, callback) {
    nodeRef = nodeRef.current;

    let listener = () => {
        nodeRef.removeEventListener('animationend', listener);
        if (callback) callback();
    };

    nodeRef.addEventListener('animationend', listener);
    nodeRef.classList.remove(removeClass);
    nodeRef.classList.add(addClass);
}