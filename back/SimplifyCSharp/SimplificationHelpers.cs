using System;
using System.Collections.Generic;

namespace SimplifyCSharp
{
    public class SimplificationHelpers
    {
        public static IList<T> Simplify<T>(
            IList<T> points,
            Func<T, T, Boolean> equalityChecker,
            Func<T, double> xExtractor,
            Func<T, double> yExtractor,
            double tolerance = 1.0,
            bool highestQuality = false)
        {
            var simplifier2D = new Simplifier2D<T>(equalityChecker, xExtractor, yExtractor);
            return simplifier2D.Simplify(points, tolerance, highestQuality);
        }
    }
}