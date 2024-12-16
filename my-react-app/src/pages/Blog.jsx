// src/components/Blog.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/api'; // Adjust the path if necessary
import './blog.css'; // Import the updated blog stylesheet
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import React Quill styles
import AddCategoryModal from './AddCategoryModal';
import AddTagModal from './AddTagModal';

const Blog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access authentication state from Redux store
  const { isAuthenticated } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newPost, setNewPost] = useState({ title: '', content: '', categories: [], tags: [] });
  const [showPostModal, setShowPostModal] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [creatingPost, setCreatingPost] = useState(false);
  const [allPosts, setAllPosts] = useState([]); // All posts fetched initially



  // State for modals
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);

  // State for collapsible New Post Form
  const [isNewPostCollapsed, setIsNewPostCollapsed] = useState(true);

  // Fetch all blog posts with optional filtering
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/blog/posts');
        setAllPosts(response.data.posts);
        setPosts(response.data.posts); // Initially display all posts
        setError('');
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, []);
  
  const filterPosts = () => {
    let filteredPosts = [...allPosts]; // Start with all posts
  
    if (selectedCategory) {
      filteredPosts = filteredPosts.filter((post) =>
        post.categories.some((category) => category.id === selectedCategory)
      );
    }
  
    if (selectedTag) {
      filteredPosts = filteredPosts.filter((post) =>
        post.tags.some((tag) => tag.id === selectedTag)
      );
    }
  
    setPosts(filteredPosts); // Update the displayed posts
  };

  useEffect(() => {
    filterPosts();
  }, [selectedCategory, selectedTag]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setPosts(allPosts); // Reset to show all posts
  };
  
  
  

  // Fetch categories and tags on component mount
  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          api.get('/api/blog/categories'),
          api.get('/api/blog/tags'),
        ]);
        setCategories(categoriesResponse.data.categories);
        setTags(tagsResponse.data.tags);
        setError('');
      } catch (err) {
        console.error('Error fetching categories or tags:', err);
        setError('Failed to load categories or tags.');
      }
    };

    fetchCategoriesAndTags();
  }, []);

  // Fetch comments for a specific post
  const fetchComments = async (postId) => {
    try {
      const response = await api.get(`/api/blog/posts/${postId}/comments`);
      setComments(response.data.comments);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments.');
    }
  };

  // Handle selecting a post
  const handleSelectPost = async (post) => {
    setSelectedPost(post);
    await fetchComments(post.id);
    setShowPostModal(true);
  };

  // Handle closing the post modal
  const handleClosePostModal = () => {
    setShowPostModal(false);
    setSelectedPost(null);
    setComments([]);
  };

  // Handle adding a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const payload = {
        content: newComment,
      };

      // If user is authenticated, no need for guest fields
      if (isAuthenticated) {
        const response = await api.post(`/api/blog/posts/${selectedPost.id}/comments`, payload);
        setComments([
          ...comments,
          {
            id: response.data.commentId,
            content: newComment,
            author_name: 'You',
            created_at: new Date().toISOString(),
          },
        ]);
      } else {
        // For guest comments, collect author_name and author_email
        const author_name = prompt('Enter your name:');
        const author_email = prompt('Enter your email:');
        if (!author_name || !author_email) {
          setError('Name and email are required for guest comments.');
          return;
        }

        const guestPayload = {
          ...payload,
          author_name,
          author_email,
        };

        const response = await api.post(`/api/blog/posts/${selectedPost.id}/comments`, guestPayload);
        setComments([
          ...comments,
          {
            id: response.data.commentId,
            content: newComment,
            author_name: author_name,
            created_at: new Date().toISOString(),
          },
        ]);
      }

      setNewComment('');
      setError('');
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment.');
    }
  };

  // Handle creating a new post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) {
      setError('Title and content are required.');
      return;
    }

    if (newPost.categories.length === 0) {
      setError('Please select at least one category.');
      return;
    }

    if (newPost.tags.length === 0) {
      setError('Please select at least one tag.');
      return;
    }

    setCreatingPost(true);
    try {
      const payload = {
        title: newPost.title,
        content: newPost.content,
        status: 'published',
      };

      // Create the new post
      const response = await api.post('/api/blog/posts', payload);

      // Extract postId from the response
      const { post } = response.data;

      if (!post || !post.id) {
        throw new Error('Post data not returned from the server.');
      }

      // Assign categories and tags to the new post
      await Promise.all([
        api.post(`/api/blog/posts/${post.id}/categories`, {
          categoryIds: newPost.categories,
        }),
        api.post(`/api/blog/posts/${post.id}/tags`, {
          tagIds: newPost.tags,
        }),
      ]);

      // Fetch the newly created post with its categories and tags to ensure consistency
      const fetchCreatedPost = await api.get(`/api/blog/posts/${post.id}`);
      if (fetchCreatedPost.data.post) {
        setPosts([fetchCreatedPost.data.post, ...posts]);
      } else {
        throw new Error('Created post data not found.');
      }

      // Reset the new post form and collapse it
      setNewPost({ title: '', content: '', categories: [], tags: [] });
      setError('');
      setIsNewPostCollapsed(true); // Collapse the form after successful creation
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post.');
    } finally {
      setCreatingPost(false);
    }
  };

  // Handle filtering posts by category
  const handleFilterByCategory = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null); // Toggle off if already selected
    } else {
      setSelectedCategory(categoryId);
    }
    setSelectedTag(null); // Reset tag filter when category is selected
  };

  // Handle filtering posts by tag
  const handleFilterByTag = (tagId) => {
    if (selectedTag === tagId) {
      setSelectedTag(null); // Toggle off if already selected
    } else {
      setSelectedTag(tagId);
    }
    setSelectedCategory(null); // Reset category filter when tag is selected
  };

  // Handle adding a new category to the frontend state after creation
  const handleCategoryAdded = (categoryId, categoryName) => {
    setCategories([...categories, { id: categoryId, name: categoryName }]);
  };

  // Handle adding a new tag to the frontend state after creation
  const handleTagAdded = (tagId, tagName) => {
    setTags([...tags, { id: tagId, name: tagName }]);
  };

  return (
    <div className="blog-page">
      <header className="blog-page__header">
        <h1 className="blog-page__title">Blog</h1>
        <p className="blog-page__subtitle">Read my latest articles on development, design, and more.</p>
        {!isAuthenticated && (
            <p className="blog-page__subtext">
            Please login or register to create a new post.
            </p>
        )}
        {/* Filter Section */}
        <div className="blog-page__filters">
          <div className="blog-page__filter">
            <h3>Filter by Category:</h3>
            <div className="blog-page__filter-options">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`filter-button ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleFilterByCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
              {selectedCategory && (
                <button className="filter-clear" onClick={() => setSelectedCategory(null)}>
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="blog-page__filter">
            <h3>Filter by Tag:</h3>
            <div className="blog-page__filter-options">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  className={`filter-button ${selectedTag === tag.id ? 'active' : ''}`}
                  onClick={() => handleFilterByTag(tag.id)}
                >
                  {tag.name}
                </button>
              ))}
              {selectedTag && (
                <button className="filter-clear" onClick={() => setSelectedTag(null)}>
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Buttons to Add Category and Tag */}
        {isAuthenticated && (
          <div className="blog-page__manage-tags-categories">
            <button onClick={() => setIsAddCategoryModalOpen(true)} className="manage-button">
              Add Category
            </button>
            <button onClick={() => setIsAddTagModalOpen(true)} className="manage-button">
              Add Tag
            </button>
          </div>
        )}

        {/* Toggle New Post Form */}
        {isAuthenticated && (
          <div className="blog-page__new-post-toggle">
            <button
              className="toggle-button"
              onClick={() => setIsNewPostCollapsed(!isNewPostCollapsed)}
            >
              {isNewPostCollapsed ? 'Create a New Post' : 'Hide New Post Form'}
            </button>
          </div>
        )}

        {/* New Post Form */}
        {isAuthenticated && !isNewPostCollapsed && (
          <div className="blog-page__new-post">
            <h2>Create a New Post</h2>
            <form onSubmit={handleCreatePost} className="blog-page__form">
              <div className="blog-page__form-group">
                <label htmlFor="title">Post Title:</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  required
                  className="blog-page__input"
                />
              </div>
              <div className="blog-page__form-group">
                <label htmlFor="content">Post Content:</label>
                <ReactQuill
                  theme="snow"
                  value={newPost.content}
                  onChange={(content) => setNewPost({ ...newPost, content })}
                  placeholder="Write your post content here..."
                  className="blog-page__textarea"
                />
              </div>

              {/* Categories Selection */}
              <div className="blog-page__form-group">
                <label htmlFor="categories">Categories:</label>
                <select
                  id="categories"
                  multiple
                  value={newPost.categories}
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      categories: Array.from(e.target.selectedOptions, (option) => parseInt(option.value)),
                    })
                  }
                  className="blog-page__select"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags Selection */}
              <div className="blog-page__form-group">
                <label htmlFor="tags">Tags:</label>
                <select
                  id="tags"
                  multiple
                  value={newPost.tags}
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      tags: Array.from(e.target.selectedOptions, (option) => parseInt(option.value)),
                    })
                  }
                  className="blog-page__select"
                >
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="blog-page__submit" disabled={creatingPost}>
                {creatingPost ? 'Publishing...' : 'Publish Post'}
              </button>
            </form>
          </div>
        )}
      </header>

      <main className="blog-page__main">
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p className="blog-page__loading">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <div className="blog-page__posts">
            {posts.map((post) => (
              <div key={post.id} className="blog-page__post-card" onClick={() => handleSelectPost(post)}>
                <h2 className="blog-page__post-title">{post.title}</h2>
                <p className="blog-page__post-date">Published on {new Date(post.created_at).toLocaleDateString()}</p>
                <p className="blog-page__post-author"><strong>Author:</strong> {post.author}</p>
                <p className="blog-page__post-comments"><strong>Comments:</strong> {post.commentCount}</p>
                <div
                  className="blog-page__post-excerpt"
                  dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) + '...' }}
                ></div>
                <div className="blog-page__post-meta">
                  {/* Display Categories */}
                  <div className="blog-page__post-categories">
                    <strong>Categories:</strong>{' '}
                    {post.categories && post.categories.length > 0 ? (
                      post.categories.map((category) => (
                        <span
                          key={category.id}
                          className="blog-page__meta-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFilterByCategory(category.id);
                          }}
                        >
                          {category.name}
                        </span>
                      ))
                    ) : (
                      <span>None</span>
                    )}
                  </div>
                  {/* Display Tags */}
                  <div className="blog-page__post-tags">
                    <strong>Tags:</strong>{' '}
                    {post.tags && post.tags.length > 0 ? (
                      post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="blog-page__meta-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFilterByTag(tag.id);
                          }}
                        >
                          {tag.name}
                        </span>
                      ))
                    ) : (
                      <span>None</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Post Details Modal */}
      {showPostModal && selectedPost && (
        <div className={`modal ${showPostModal ? 'modal--visible' : ''} blog-page__modal`} id={`post-modal-${selectedPost.id}`}>
          <div className="modal__overlay" onClick={handleClosePostModal}></div>
          <div className="modal__content">
            <button className="modal__close" onClick={handleClosePostModal}>
              &times;
            </button>
            <h2 className="modal__title">{selectedPost.title}</h2>
            <p className="modal__date">Published on {new Date(selectedPost.created_at).toLocaleDateString()}</p>
            <p className="modal__author"><strong>Author:</strong> {selectedPost.author}</p>
            <div className="modal__body">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content }}></div>
              <div className="modal__post-meta">
                {/* Display Categories */}
                <div className="modal__post-categories">
                  <strong>Categories:</strong>{' '}
                  {selectedPost.categories && selectedPost.categories.length > 0 ? (
                    selectedPost.categories.map((category) => (
                      <span
                        key={category.id}
                        className="modal__meta-item"
                        onClick={() => {
                          handleFilterByCategory(category.id);
                          handleClosePostModal();
                        }}
                      >
                        {category.name}
                      </span>
                    ))
                  ) : (
                    <span>None</span>
                  )}
                </div>
                {/* Display Tags */}
                <div className="modal__post-tags">
                  <strong>Tags:</strong>{' '}
                  {selectedPost.tags && selectedPost.tags.length > 0 ? (
                    selectedPost.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="modal__meta-item"
                        onClick={() => {
                          handleFilterByTag(tag.id);
                          handleClosePostModal();
                        }}
                      >
                        {tag.name}
                      </span>
                    ))
                  ) : (
                    <span>None</span>
                  )}
                </div>
              </div>
            </div>
            <hr />
            <h3 className="modal__subtitle">Comments ({comments.length})</h3>
            <div className="modal__comments">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="modal__comment">
                    <p className="modal__comment-author">{comment.author_name || 'Guest'} says:</p>
                    <p className="modal__comment-content">{comment.content}</p>
                    <p className="modal__comment-date">{new Date(comment.created_at).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
            <form onSubmit={handleAddComment} className="modal__form">
              <textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
                className="modal__textarea"
              ></textarea>
              <button type="submit" className="modal__submit">
                Submit Comment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onCategoryAdded={handleCategoryAdded}
      />

      {/* Add Tag Modal */}
      <AddTagModal
        isOpen={isAddTagModalOpen}
        onClose={() => setIsAddTagModalOpen(false)}
        onTagAdded={handleTagAdded}
      />
    </div>
  );
};

export default Blog;
