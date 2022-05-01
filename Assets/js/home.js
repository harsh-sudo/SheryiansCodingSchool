let all_images = document.querySelector('#background-3d-design #mousemove');
document.querySelector('#page1-main').addEventListener('mousemove', function(dets){
    all_images.style.transform = `translate(-50%,-50%) translate(${0.1-(dets.clientX*0.05)}px, ${0.1-(dets.clientY*0.05)}px)`;
});
