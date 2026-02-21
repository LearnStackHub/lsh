import { useState, useEffect } from 'react';
import { X, Plus, Edit3, Save, Code, FileText, HelpCircle, Monitor } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useContributions } from '../context/ContributionContext';

function ContributeModal({ isOpen, onClose, mode = 'add', existingTopic = null }) {
  const { user } = useAuth();
  const { addTopic, editTopic } = useContributions();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    code: '',
    section: 'basics',
    category: 'corejava'
  });
  
  const [activeTab, setActiveTab] = useState('content');
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Load existing topic data for editing
  useEffect(() => {
    if (mode === 'edit' && existingTopic) {
      setFormData({
        title: existingTopic.title || '',
        description: existingTopic.description || '',
        content: existingTopic.content || '',
        code: existingTopic.code || '',
        section: existingTopic.sectionKey || 'basics',
        category: existingTopic.courseKey || 'corejava'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        content: '',
        code: '',
        section: 'basics',
        category: 'corejava'
      });
    }
  }, [mode, existingTopic, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const topicData = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        code: formData.code,
        sectionKey: formData.section,
        courseKey: formData.category
      };

      if (mode === 'add') {
        addTopic(topicData, user.email, user.name);
      } else {
        editTopic(existingTopic.id, topicData, user.email, user.name);
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const sections = {
    corejava: [
      { value: 'basics', label: 'Java Basics' },
      { value: 'controlflow', label: 'Control Flow' },
      { value: 'oops', label: 'OOPs Concepts' },
      { value: 'strings', label: 'Strings' },
      { value: 'arrays', label: 'Arrays' },
      { value: 'exceptions', label: 'Exception Handling' },
      { value: 'collections', label: 'Collections' },
      { value: 'multithreading', label: 'Multithreading' },
      { value: 'advanced', label: 'Advanced Topics' }
    ],
    jdbc: [
      { value: 'basics', label: 'JDBC Basics' },
      { value: 'advanced', label: 'Advanced JDBC' }
    ],
    servlets: [
      { value: 'basics', label: 'Servlet Basics' },
      { value: 'advanced', label: 'Advanced Servlets' }
    ],
    jsp: [
      { value: 'basics', label: 'JSP Fundamentals' },
      { value: 'advanced', label: 'Advanced JSP' }
    ]
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content contribute-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-icon">
            {mode === 'add' ? <Plus size={24} /> : <Edit3 size={24} />}
          </div>
          <h2>{mode === 'add' ? 'Add New Tutorial' : 'Edit Tutorial'}</h2>
          <p>Contributing as: <strong>{user?.email}</strong></p>
        </div>

        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Successfully {mode === 'add' ? 'Added' : 'Updated'}!</h3>
            <p>Your contribution has been saved.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contribute-form">
            {/* Basic Info */}
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => {
                    handleChange('category', e.target.value);
                    // Reset section when category changes
                    const newSections = sections[e.target.value];
                    if (newSections && newSections.length > 0) {
                      handleChange('section', newSections[0].value);
                    }
                  }}
                >
                  <option value="corejava">Core Java</option>
                  <option value="jdbc">JDBC</option>
                  <option value="servlets">Servlets</option>
                  <option value="jsp">JSP</option>
                </select>
              </div>
              <div className="form-group">
                <label>Section</label>
                <select 
                  value={formData.section}
                  onChange={(e) => handleChange('section', e.target.value)}
                >
                  {sections[formData.category]?.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Tutorial Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Java Lambda Expressions"
                required
              />
            </div>

            <div className="form-group">
              <label>Short Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Brief description of the topic"
              />
            </div>

            {/* Tabs for Content and Code */}
            <div className="contribute-tabs">
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                <FileText size={16} />
                Content
              </button>
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
                onClick={() => setActiveTab('code')}
              >
                <Code size={16} />
                Code Example
              </button>
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'help' ? 'active' : ''}`}
                onClick={() => setActiveTab('help')}
              >
                <HelpCircle size={16} />
                Help
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'content' && (
                <div className="form-group">
                  <label>Tutorial Content (Markdown supported)</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    placeholder={`# Topic Title

## Introduction
Write your introduction here...

## Key Points
- Point 1
- Point 2

## Example
Explain with examples...

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |`}
                    rows={15}
                  />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="form-group">
                  <label>Java Code Example</label>
                  <textarea
                    value={formData.code}
                    onChange={(e) => handleChange('code', e.target.value)}
                    placeholder={`public class Example {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}
                    rows={15}
                    className="code-textarea"
                  />
                </div>
              )}

              {activeTab === 'help' && (
                <div className="help-content">
                  <h4>Markdown Formatting Guide</h4>
                  <ul>
                    <li><code># Heading 1</code> - Main heading</li>
                    <li><code>## Heading 2</code> - Sub heading</li>
                    <li><code>**bold**</code> - Bold text</li>
                    <li><code>\`code\`</code> - Inline code</li>
                    <li><code>- item</code> - Bullet list</li>
                    <li><code>1. item</code> - Numbered list</li>
                    <li><code>&gt; quote</code> - Blockquote</li>
                  </ul>
                  <h4>Table Format</h4>
                  <pre>{`| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |`}</pre>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                <Save size={18} />
                {isSaving ? 'Saving...' : (mode === 'add' ? 'Add Tutorial' : 'Save Changes')}
              </button>
            </div>

            <div className="contributor-note">
              This contribution will be attributed to: <strong>{user?.name}</strong> ({user?.email})
            </div>
            
            <div className="storage-notice">
              <Monitor size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              <strong>Local Storage Mode:</strong> Your contributions are saved in this browser only. 
              They will persist across sessions but won't be visible to other users. 
              Perfect for personal notes and practice!
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContributeModal;



