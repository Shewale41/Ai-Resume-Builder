import { Button } from '@/components/ui/button';
import RichTextEditor from '@/components/ui/customMade/RichTextEditor';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';

const emptyExperience = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummary: ''
};

function ExperienceForm({ enableNext }) {
  const [experienceList, setExperienceList] = useState([emptyExperience]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setExperienceList(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handleRichTextEditor = (e, name, index) => {
    const value = e.target.value;
    setExperienceList(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const AddNewExperience = () => {
    setExperienceList(prev => [...prev, { ...emptyExperience }]);
  };

  const removeExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList(prev => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList
    });
    console.log(experienceList);
  }, [experienceList]);

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-purple-500 border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add your previous work experience</p>
      </div>

      <div>
        {(experienceList || []).map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 p-3 my-5 rounded-lg'>
              <div>
                <label className='text-xs'>Position Title</label>
                <Input
                  name='title'
                  value={item.title}
                  onChange={e => handleInputChange(index, e)}
                />
              </div>
              <div>
                <label className='text-xs'>Company Name</label>
                <Input
                  name='companyName'
                  value={item.companyName}
                  onChange={e => handleInputChange(index, e)}
                />
              </div>
              <div>
                <label className='text-xs'>City</label>
                <Input
                  name='city'
                  value={item.city}
                  onChange={e => handleInputChange(index, e)}
                />
              </div>
              <div>
                <label className='text-xs'>State</label>
                <Input
                  name='state'
                  value={item.state}
                  onChange={e => handleInputChange(index, e)}
                />
              </div>
              <div>
                <label className='text-xs'>Start Date</label>
                <Input
                  name='startDate'
                  type='date'
                  value={item.startDate}
                  onChange={e => handleInputChange(index, e)}
                />
              </div>
              <div>
                <label className='text-xs'>End Date</label>
                <Input
                  name='endDate'
                  type='date'
                  value={item.endDate}
                  onChange={e => handleInputChange(index, e)}
                />
              </div>
              <div className='col-span-2'>
                <RichTextEditor
                  value={item.workSummary}
                  onRichTextEditorChange={e =>
                    handleRichTextEditor(e, 'workSummary', index)
                  }
                  index={index}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-5'>
          <Button
            variant='outline'
            className='text-[#9156ff]'
            onClick={AddNewExperience}
          >
            + Add more Experience
          </Button>
          <Button
            variant='outline'
            className='text-[#9156ff]'
            onClick={removeExperience}
          >
            - Remove
          </Button>
        </div>
        <Button>Save</Button>
      </div>
    </div>
  );
}

export default ExperienceForm;
