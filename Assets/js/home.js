// const db = require('../../Config/mongoose');
// const flag = require('../Models/Flags');

let all_images = document.querySelector('#background-3d-design #mousemove');


if(document.querySelector('#page1-main')){
document.querySelector('#page1-main').addEventListener('mousemove', function(dets){
    all_images.style.transform = `translate(-50%,-50%) translate(${0.1-(dets.clientX*0.05)}px, ${0.1-(dets.clientY*0.05)}px)`;
});
} 

// let live_course = document.querySelector('#attention-seeker-button1');

// live_course.addEventListener('click', function(){
//     let live_course_flag = 0;
//     flag.find({}, (err, flags) => {
//         if(err){
//             console.log(err);
//             return;
//         }
//         if(!flags){
//             flag.create({
//                 flag_name: 'live_course',
//                 flag_value: '1'
//             }, (err, flag) => {
//                 if(err){
//                     console.log(err);
//                     return;
//                 }
//             });
//         } else {
//             flag.findOne({
//                 flag_name: 'live_course'
//                 }, (err, flag) => { 
//                 if(err){
//                     console.log(err);
//                     return;
//                 }
//                 flag.findandupdate({
//                     flag_name: 'live_course'
//                 }, {
//                     flag_value: '1'
//                 }, (err, flag) => {
//                     if(err){
//                         console.log(err);
//                         return; 
//                     }
//                 });
//             }
//       );
//   } 
// });
// });

// flag.findOne({
//     flag_name: 'live_course'
//     }, (err, flag) => { 
//     if(err){
//         console.log(err);
//         return;
//     }
//     if(flag.flag_value === '1'){
//         scroller.scrollTo(document.querySelector('#page2'));
//         document.querySelector('#page1 button').addEventListener('click', () => {
//             scroller.scrollTo(document.querySelector('#page2'));
//         });
//         flag.findandupdate({
//         flag_name: 'live_course'
//         }, {
//         flag_value: '0'
//         }, (err, flag) => {
//             if(err){
//                 console.log(err);
//                 return; 
//             }
//         });
//     }   
// });

 

// document.querySelector('#page2').scrollIntoView({behavior: 'smooth'});
