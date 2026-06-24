import React, { useState } from "react";
import "./Support.css";
import { FiSearch } from "react-icons/fi";
import { useEffect } from "react";
import { LuCopy } from "react-icons/lu";
import AuthService from "../../../Apis/AuthServices/AuthService";
import { toast } from "react-toastify";

const HelpSupport = () => {
    const [formData, setFormData] = useState({
        subject: "",
        category: "",
        priority: "Medium",
        description: "",
        document: null,
    });

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };


    useEffect(() => {
        getSupportTickets();
    }, []);

    const getSupportTickets = async () => {
        try {
            const response = await AuthService.getSupportTickets();

            if (response.success) {
                setTickets(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.subject || !formData.category || !formData.description) {
            return;
        }

        try {

            setLoading(true);

            const payload = new FormData();

            payload.append("subject", formData.subject);
            payload.append("category", formData.category);
            payload.append("priority", formData.priority);
            payload.append("description", formData.description);

            if (formData.document) {
                payload.append("document", formData.document);
            }

            const response = await AuthService.supportTicket(payload);

            if (response.success) {
                toast.success(response.message);

                setFormData({
                    subject: "",
                    category: "",
                    priority: "medium",
                    description: "",
                    document: null,
                });

                await getSupportTickets();
            } else {
                toast.error(response.message || "Failed to create ticket");
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    };
    return (
        <div className="help-support">

            <h2>Help/Support</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">

                    <div className="form-groupSupport">
                        <label>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Enter Subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-groupSupport">
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            <option value="deposit">Deposit</option>
                            <option value="withdrawal">Withdrawal</option>
                            <option value="kyc">KYC</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-groupSupport">
                        <label>Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="form-groupSupport">
                        <label>Supporting Documents (Optional)</label>
                        <input
                            type="file"
                            name="document"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-groupSupport description">
                        <label>Description</label>
                        <textarea
                            rows="5"
                            name="description"
                            placeholder="Describe your issue in detail"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <button className="submit-btn">
                    Submit
                </button>
            </form>

            {/* Ticket Table */}

            {tickets.length > 0 && (
                <div className="issue-list">

                    <div className="issue-header">
                        <h2>Issue List</h2>

                        <div className="search-box">
                            <FiSearch />
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Ticket ID</th>
                                <th>Category</th>
                                <th>Subject</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tickets.map((ticket, index) => (
                                <tr key={ticket._id}>
                                    <td>{index + 1}</td>

                                    <td>
                                        <span className="ticket-id">
                                            {ticket.ticketId}
                                        </span>
                                    </td>

                                    <td>{ticket.category}</td>

                                    <td>{ticket.subject}</td>

                                    <td>
                                        <span
                                            className={`priority ${ticket.priority.toLowerCase()}`}
                                        >
                                            {ticket.priority}
                                        </span>
                                    </td>

                                    <td>
                                        {ticket.status}
                                        <span className="status-dot"></span>
                                    </td>

                                    <td>
                                        <button className="view-btn">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
};

export default HelpSupport;