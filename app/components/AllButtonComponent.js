import { ArrowRight, Loader2, Send } from 'lucide-react';
import React from 'react';
import KarbarButton from './KarbarButton';

// Example page showing all button variants
const ButtonExamples = () => {
    const [loading, setLoading] = React.useState(false);

    const handleClick = () => {
        console.log('Button clicked!');
    };

    const handleLoadingClick = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="p-8 space-y-6">
            {/* Default Buttons */}
            <div className="space-y-2">
                <h2 className="mb-4 text-xl font-bold">Default Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <KarbarButton>Regular Button</KarbarButton>

                    <KarbarButton onClick={handleClick}>
                        With Click Handler
                    </KarbarButton>

                    <KarbarButton disabled>Disabled Button</KarbarButton>

                    <KarbarButton onClick={handleLoadingClick}>
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            'Click to Load'
                        )}
                    </KarbarButton>

                    <KarbarButton>
                        <Send className="w-4 h-4 mr-2" />
                        With Icon
                    </KarbarButton>

                    <KarbarButton>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </KarbarButton>
                </div>
            </div>

            {/* Outline Buttons */}
            <div className="space-y-2">
                <h2 className="mb-4 text-xl font-bold">Outline Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <KarbarButton variant="outline">
                        Outline Button
                    </KarbarButton>

                    <KarbarButton
                        variant="outline"
                        onClick={handleClick}
                    >
                        With Click Handler
                    </KarbarButton>

                    <KarbarButton
                        variant="outline"
                        disabled
                    >
                        Disabled Outline
                    </KarbarButton>

                    <KarbarButton variant="outline">
                        <Send className="w-4 h-4 mr-2" />
                        With Icon
                    </KarbarButton>
                </div>
            </div>

            {/* Link Buttons */}
            <div className="space-y-2">
                <h2 className="mb-4 text-xl font-bold">Link Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <KarbarButton
                        asLink
                        href="/dashboard"
                    >
                        Link to Dashboard
                    </KarbarButton>

                    <KarbarButton
                        asLink
                        href="/profile"
                        variant="outline"
                    >
                        Profile Link
                    </KarbarButton>

                    <KarbarButton
                        asLink
                        href="/settings"
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Settings
                    </KarbarButton>
                </div>
            </div>

            {/* With Custom Classes */}
            <div className="space-y-2">
                <h2 className="mb-4 text-xl font-bold">
                    Custom Styled Buttons
                </h2>
                <div className="flex flex-wrap gap-4">
                    <KarbarButton className="w-full md:w-auto">
                        Full Width on Mobile
                    </KarbarButton>

                    <KarbarButton className="rounded-full">
                        Rounded Button
                    </KarbarButton>

                    <KarbarButton className="text-xs">Small Text</KarbarButton>

                    <KarbarButton className="px-8 text-lg">
                        Large Button
                    </KarbarButton>
                </div>
            </div>
        </div>
    );
};

export default ButtonExamples;
