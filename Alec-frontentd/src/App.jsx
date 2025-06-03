import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Sidbar/Layout';
import React from 'react';
import Course from './pages/Course';
import Banner from './pages/Banner';
import CourseDisplay from './pages/CourseDisplay';
import Bannerdisplay from './pages/Bannerdisplay';
import QueryDisplay from './pages/QueryDisplay';
import SuccessStory from './pages/SuccessStory';
import SucessStroydisplay from './pages/SucessStroydisplay';
import CategoryManagement from './pages/CategoryManagement';
import EnquiryDisplay from './pages/EnquiryDisplay';
import ContactDisplay from './pages/Contact/ContactDisplay';
import EnrollDisplay from './pages/Enroll/EnrollDisplay';
import WhatsNew from './pages/WhatsNew/WhatsNew';
import DisplayWhatsNew from './pages/WhatsNew/DisplayWhatsNew';
import Blog from './pages/Blog';
import BlogDisplay from './pages/BlogDisplay';
import TeamMember from './pages/TeamMember';
import TeamMemberdisplay from './pages/TeamMemberdisplay';
import Choose from './pages/Choose';
import ChooseDisplay from './pages/ChooseDisplay';
import Syllabus from './pages/Syllabus';
import SyllabusDisplay from './pages/SyllabusDisplay';
import CourseForm from './pages/pretest/test';
import MainForm from './pages/Main/main';
import PreDisplay from './pages/pretest/predisplay';
import MainDisplay from './pages/Main/displaymain';
import CallbackpopShow from './pages/CallbackPop/CallbackpopShow';
import JudgementForm from './pages/judegment/judegment';
import JudegementDisplay from './pages/judegment/judegementDisplay';
import Event from './pages/Event/Event';
import Eventdisplay from './pages/Event/Eventdisplay';
import URL from './pages/URL/URL';
import URLdisplay from './pages/URL/URLdisplay';
import Dashbaord from './Dashboard/Dashbaord';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route path="/courses" element={<Course/>}/>
        <Route path='/banner' element={<Banner/>}/>
        <Route path='/allcourse' element={<CourseDisplay/>}/>
        <Route path='/allbanner' element={<Bannerdisplay/>}/>
        <Route path='/allquerydisplay' element={<QueryDisplay/>}/>
        <Route path="/sucessStory"  element={<SuccessStory/>}/>
        <Route path="/sucessStorydisplay" element={<SucessStroydisplay/>}/>
           <Route path="/categories" element={<CategoryManagement/>} />
           <Route path='/enquirydisplay' element={<EnquiryDisplay/>}/>
           <Route path='/contactdisplay' element={<ContactDisplay/>}/>
           <Route path='/enroll' element={<EnrollDisplay/>}/>
           <Route path='/whatsnew' element={<WhatsNew/>}/>
           <Route path='/whatsnewdisplay' element={<DisplayWhatsNew/>}/>
           <Route path='/blog'  element={<Blog/>}/>
           <Route path='/blogdisplay' element={<BlogDisplay/>}/>
           <Route path='/member' element={<TeamMember/>}/>
           <Route path='/memberdisplay' element={<TeamMemberdisplay/>}/>
           <Route path="/choose" element={<Choose/>}/>
           <Route path='/choosedisplay' element={<ChooseDisplay/>}/>
           <Route path="/syllabus" element={<Syllabus/>}/>
           <Route path='/syllabusdisplay' element={<SyllabusDisplay/>}/>
           <Route path="/test" element={<CourseForm/>}/>
           <Route path="/main" element={<MainForm/>}/>
           <Route path='/predisplay' element={<PreDisplay/>}/>
           <Route path='/maindisplay' element={<MainDisplay/>}/>
           <Route path="/callbackpop" element={<CallbackpopShow/>}/>
           <Route path="/judement" element={<JudgementForm/>}/>
           <Route path='/judementshow' element={<JudegementDisplay/>}/>
           <Route path="/event" element={<Event/>}/>
           <Route path='/eventdisplay' element={<Eventdisplay/>}/>
           <Route path="/url" element={<URL/>}/>
           <Route path="/urlshow" element={<URLdisplay/>}/>
          <Route path="/dashboard" element={<Dashbaord/>}/>




        
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
