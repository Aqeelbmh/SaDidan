'use client';

import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiX, FiSave, FiSearch } from 'react-icons/fi';

interface DataItem {
  id: string;
  [key: string]: unknown;
}

interface DataManagerProps {
  section: string;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'url' | 'array' | 'select';
    required?: boolean;
    options?: string[];
    placeholder?: string;
  }[];
  title: string;
  refreshStats?: () => void;
}

const DataManager = ({ section, fields, title, refreshStats }: DataManagerProps) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [section]);

  const fetchData = async () => {
    try {
      // Try API first (for development)
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        const response = await fetch(`/api/admin?section=${section}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
          // Also save to localStorage for backup
          localStorage.setItem(`portfolio_${section}`, JSON.stringify(result));
        } else {
          // API not available, fall back to localStorage below
          // Optionally: console.warn('API not available, using localStorage fallback');
        }
      } else {
        // In static export, use localStorage
        const storedData = localStorage.getItem(`portfolio_${section}`);
        if (storedData) {
          setData(JSON.parse(storedData));
        } else {
          // Initialize with empty array
          setData([]);
        }
      }
    } catch {
      // Optionally: console.warn('Error fetching data, using localStorage fallback');
      // Fallback to localStorage
      const storedData = localStorage.getItem(`portfolio_${section}`);
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        setData([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let updatedData = [...data];
      
      if (editingItem) {
        // Update existing item
        updatedData = updatedData.map(item => 
          item.id === editingItem.id ? { ...item, ...formData } : item
        );
      } else {
        // Add new item
        const newItem = {
          ...formData,
          id: Date.now().toString()
        };
        updatedData = [...updatedData, newItem];
      }
      
      // Update state
      setData(updatedData);
      
      // Save to localStorage
      localStorage.setItem(`portfolio_${section}`, JSON.stringify(updatedData));
      
      // Try to save to API if available (for development)
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        try {
          const url = editingItem 
            ? `/api/admin?section=${section}&id=${editingItem.id}`
            : `/api/admin?section=${section}`;
          
          const method = editingItem ? 'PUT' : 'POST';
          
          await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
        } catch (apiError) {
          console.warn('API save failed, but data saved to localStorage:', apiError);
        }
      }
      
      setShowForm(false);
      setEditingItem(null);
      setFormData({});
      if (typeof refreshStats === 'function') refreshStats();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleEdit = (item: DataItem) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      // Update state
      const updatedData = data.filter(item => item.id !== id);
      setData(updatedData);
      
      // Save to localStorage
      localStorage.setItem(`portfolio_${section}`, JSON.stringify(updatedData));
      
      // Try to delete from API if available (for development)
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        try {
          await fetch(`/api/admin?section=${section}&id=${id}`, {
            method: 'DELETE',
          });
        } catch (apiError) {
          console.warn('API delete failed, but data deleted from localStorage:', apiError);
        }
      }
      if (typeof refreshStats === 'function') refreshStats();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setShowForm(true);
    // No need to refresh stats here, will refresh after submit
  };

  const renderField = (field: Record<string, unknown>) => {
    const value = formData[field.name as string] || '';
    
    switch (field.type as string) {
      case 'textarea':
        return (
          <textarea
            name={field.name as string}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => setFormData({ ...formData, [field.name as string]: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            rows={3}
            placeholder={field.placeholder as string}
            required={field.required as boolean}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            name={field.name as string}
            value={typeof value === 'string' || typeof value === 'number' ? value : ''}
            onChange={(e) => setFormData({ ...formData, [field.name as string]: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder={field.placeholder as string}
            required={field.required as boolean}
          />
        );
      
      case 'url':
        return (
          <input
            type="url"
            name={field.name as string}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => setFormData({ ...formData, [field.name as string]: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder={field.placeholder as string}
            required={field.required as boolean}
          />
        );
      
      case 'array':
        return (
          <input
            type="text"
            name={field.name as string}
            value={Array.isArray(value) ? (value as string[]).join(', ') : (typeof value === 'string' ? value : '')}
            onChange={(e) => setFormData({ ...formData, [field.name as string]: (e.target.value.split(',').map(s => s.trim()) as string[]) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder={field.placeholder as string || 'Comma-separated values'}
            required={field.required as boolean}
          />
        );
      
      case 'select':
        return (
          <select
            name={field.name as string}
            value={typeof value === 'string' || typeof value === 'number' ? value : ''}
            onChange={(e) => setFormData({ ...formData, [field.name as string]: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required={field.required as boolean}
          >
            <option value="">Select an option</option>
            {(field.options as string[])?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            type="text"
            name={field.name as string}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => setFormData({ ...formData, [field.name as string]: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder={field.placeholder as string}
            required={field.required as boolean}
          />
        );
    }
  };

  // Filtered data
  const filteredData = data.filter(item =>
    fields.some(field =>
      (item[field.name as string] || '')
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-white tracking-tight">{title}</h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold shadow hover:from-blue-600 hover:to-teal-500 transition-colors text-base"
        >
          <FiPlus className="w-5 h-5" /> Add New
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center mb-4 gap-2">
        <div className="relative w-full max-w-xs">
          <span className="absolute left-3 top-2.5 text-gray-400"><FiSearch /></span>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none w-full"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-2xl shadow bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
            <tr>
              {fields.map(field => (
                <th key={field.name} className="px-4 py-3 text-left text-xs font-semibold text-blue-900 dark:text-blue-200 uppercase tracking-wider">
                  {field.label}
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold text-blue-900 dark:text-blue-200 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={fields.length + 1} className="px-4 py-8 text-center text-gray-400 dark:text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={fields.length + 1} className="px-4 py-8 text-center text-gray-400 dark:text-gray-500">
                  No data found.
                </td>
              </tr>
            ) : (
              filteredData.map(item => (
                <tr key={item.id} className="hover:bg-blue-50 dark:hover:bg-gray-900 transition-colors">
                  {fields.map(field => (
                    <td key={field.name} className="px-4 py-3 text-gray-900 dark:text-gray-100 text-sm">
                      {Array.isArray(item[field.name as string]) ? (item[field.name as string] as string[]).join(', ') : String(item[field.name as string] ?? '')}
                    </td>
                  ))}
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      aria-label="Edit"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id as string)}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                      aria-label="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-blue-100 dark:border-gray-800 animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 dark:hover:text-blue-300 text-2xl"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              <FiX />
            </button>
            <h3 className="text-2xl font-bold text-blue-900 dark:text-white mb-6 text-center">
              {editingItem ? 'Edit' : 'Add New'} {title}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {fields.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1" htmlFor={field.name}>{field.label}</label>
                  {renderField(field)}
                </div>
              ))}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-semibold"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold shadow hover:from-blue-600 hover:to-teal-500 transition-colors"
                >
                  <FiSave className="inline-block mr-1 mb-0.5" /> {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManager; 